/* Angular modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

/* 3rd party Components */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';


/* MyApp Modules and Services */
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { EventService } from './event.service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

/* MyApp Components */
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventCardComponent } from './event-card/event-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginDialog } from './navbar/login-dialog.component';
import { SignupDialog } from './navbar/signup-dialog.component';
import { GoogleLoginButtonComponent } from './navbar/google-login-button/google-login-button.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    EventCardComponent,
    UserProfileComponent,
    SignupDialog,
    LoginDialog,
    GoogleLoginButtonComponent,
  ],
  entryComponents: [
    LoginDialog,
    SignupDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    CoreModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
