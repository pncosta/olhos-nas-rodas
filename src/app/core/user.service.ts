import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './auth.service';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _firebaseStore: AngularFirestore)
  { 
  }


  public getUser (uid): Observable<User> {
    return this._firebaseStore.doc<User>(`users/${uid}`).valueChanges();

  }
}
