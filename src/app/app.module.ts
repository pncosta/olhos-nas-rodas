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
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { WavesModule, ButtonsModule } from 'angular-bootstrap-md'

/* MyApp Modules and Services */
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
/* import { InMemoryDataService } from './in-memory-data.service'; */
import { EventService } from './events/event.service';
import { UploadFileService } from './fileUpload/upload-file.service';
import { GeoLocationService  } from './geo-location.service';
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
import { SignupDialogComponent } from './navbar/signup-dialog.component';
import { GoogleLoginButtonComponent } from './navbar/google-login-button/google-login-button.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { NewEventComponent } from './events/new-event/new-event.component';
import { NotLoggedInComponent } from './not-logged-in/not-logged-in.component';
import { NewEventFormComponent } from './events/new-event-form/new-event-form.component';
import { ConfirmationDialogComponent } from './events/new-event-form/confirmation-dialog.component';
import { MyMapComponent } from './my-map/my-map.component';
import { FormUploadComponent } from './fileUpload/form-upload/form-upload.component';
import { DetailsUploadComponent } from './fileUpload/details-upload/details-upload.component';
import { ListUploadComponent } from './fileUpload/list-upload/list-upload.component';
import { LockerTypeComponent } from './widgets/locker-type/locker-type.component';
import { DropZoneDirective } from './widgets/drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ColorPickerComponent } from './widgets/color-picker/color-picker.component';
import { TimePickerComponent } from './widgets/time-picker/time-picker.component';
import { CarouselComponent } from './widgets/carousel/carousel.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EventEditComponent } from './events/event-edit/event-edit.component';

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
    SignupDialogComponent,
    LoginDialog,
    GoogleLoginButtonComponent,
    UserAvatarComponent,
    NewEventComponent,
    NotLoggedInComponent,
    NewEventFormComponent,
    ConfirmationDialogComponent,
    MyMapComponent,
    FormUploadComponent,
    DetailsUploadComponent,
    ListUploadComponent,
    LockerTypeComponent,
    DropZoneDirective,
    FileSizePipe,
    ColorPickerComponent,
    TimePickerComponent,
    CarouselComponent,
    TruncatePipe,
    EventEditComponent
  ],
  entryComponents: [
    LoginDialog,
    ConfirmationDialogComponent,
    SignupDialogComponent
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
    AngularFireStorageModule,
    CoreModule,
    WavesModule, ButtonsModule,
    MDBBootstrapModule.forRoot()
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [EventService, GeoLocationService, UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
