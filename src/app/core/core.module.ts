import { NgModule } from '@angular/core';

import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ AuthService , MessageService]
})
export class CoreModule { }