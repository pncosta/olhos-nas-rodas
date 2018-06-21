import { NgModule } from '@angular/core';

import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ AuthService , MessageService, AuthGuard]
})
export class CoreModule { }