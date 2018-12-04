
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
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
  favoriteColor?: string;
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

  signup(email: string, password: string) {
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.setUserDoc(user));

  }

  login(email: string, password: string) {

    const promise = new Promise((resolve, reject) => {
      this._firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => { resolve(value); })
      .catch(err => { reject(err); });
     });
    return promise;
    }

  isLoggedIn() {
    return this.userDetails != null;
  }

  get uid() {
    return this.userDetails ? this.userDetails.uid : null ;
  }

  get UserDetails(): User { return this.userDetails }

  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

   // Update properties on the user document
   updateUser(data: any) {
    return this._firebaseStore.doc(`users/${this.userDetails.uid}`).update(data);
  }

  updatePassword (password: string) {
    const user = this._firebaseAuth.auth.currentUser;
    user.updatePassword(password)
      .then(function(r) {
        console.log ('Success updating user pass! ');
      }).catch(function(error) {
        // TODO: handle error
        console.log (error);
      });
  }

  logInWithPopup() {
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  private oAuthLogin(provider) {
    return this._firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.setUserDoc(credential.user);
      });
  }

   // Sets user data to firestore after succesful login
  private setUserDoc(user) {

    const userRef: AngularFirestoreDocument<any> = this._firebaseStore.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }
    // If error, console log and notify user
    private handleError(error) {
      console.error(error);
    }


}
