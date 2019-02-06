
import { of as observableOf, Observable } from 'rxjs';
import { auth } from 'firebase';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
// https://itnext.io/part-2-complete-step-by-step-firebase-authentication-in-angular-2-25d284102632

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  fullName?: string,
  genre?: string;
  age?: number;
  district?: string;
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  // private user: Observable<firebase.User>;
  user: Observable<User>;
  private userDetails: User = null;

  constructor(private _firebaseAuth: AngularFireAuth,
    private _firebaseStore: AngularFirestore,
    private router: Router) {

    //// Get auth data, then get firestore user document || null
    this.user = this._firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this._firebaseStore.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return observableOf(null);
      }));

    this.user.subscribe(
      (user) => { this.userDetails = user ? user : null; }
    );
  }

  ////// OAuth Methods /////

  private oAuthLogin(provider: any): Promise<any> {
    var promise = new Promise ((resolve, reject) => {
      this._firebaseAuth.auth
        .signInWithPopup(provider)
        .then(credential => {
          this.updateUserData(credential.user);
          resolve(credential.user);
        })
        .catch(error => {
          this.handleError(error);
          reject(error);
        });

    });

    return promise;
   
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    // provider.addScope('https://www.googleapis.com/auth/plus.me');
    // provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    return this.oAuthLogin(provider);
  }
 
  signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday');
    // provider.addScope('user_gender');
    // provider.addScope('user_age_range');
    // provider.addScope('user_location');
    return this.oAuthLogin(provider);
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      this._firebaseAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {  
          return this.updateUserData(credential.user)})
        .then (res => {
          return this.sendEmailVerification})
        .then(credential => {
          resolve(credential);
        })
        .catch(error => {
          this.handleError(error);
          reject(error);
        });
    });
    return promise;
  }

  emailLogin(email: string, password: string): Promise<any> {
    var promise = new Promise((resolve, reject) => {
      this._firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUserData(credential.user);
        resolve(credential);
      })
      .catch(error => {
        this.handleError(error);
        reject(error);
      });
    });

    return promise;
   
  }

  //// Other Methods ////

  sendEmailVerification(): Promise<any> {
    return this._firebaseAuth.auth.currentUser.sendEmailVerification();
  }

  // Sends email allowing user to reset password
  resetPassword(email: string): Promise<any> {
    const fbAuth = auth();
    return fbAuth
      .sendPasswordResetEmail(email);
  }


  isLoggedIn() {
    return this.userDetails != null;
  }


  get emailVerified() {
    return this._firebaseAuth.auth.currentUser.emailVerified
    || this._firebaseAuth.auth.currentUser.providerData[0].providerId === 'facebook.com'; 
    // Firebase considers accounts from facebook not verified. Lets ignored him :)
  }

  get uid() {
    return this.userDetails ? this.userDetails.uid : null;
  }

  get UserDetails(): User { return this.userDetails }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }


  // Update properties on the user document
  updateUser(data: any): Promise<any> {
    return this._firebaseStore.doc(`users/${this.userDetails.uid}`).update(data);
  }

  updatePassword(password: string): Promise<any> {
    const user = this._firebaseAuth.auth.currentUser;
    return user.updatePassword(password);
  }


  // Sets user data to firestore after succesful login
  private updateUserData(user: User): Promise<any> {
    const userRef: AngularFirestoreDocument<User> = this._firebaseStore.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || user.email.split("@")[0],
      photoURL: user.photoURL,
    };
    return userRef.set(data);
  }


  private handleError(error) {
    console.error(error);
  }
}
