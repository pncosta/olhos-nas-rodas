
import {debounceTime, filter} from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import {MatDialog} from '@angular/material';
import { SubscriptionLike as ISubscription ,  Observable, Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage'

import { Component, OnInit, ViewChild, AfterViewInit, Input, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../event';
import { EventService } from '../event.service';
import { AuthService } from '../../core/auth.service';
import { Bicycle, Image } from '../../bicycle';
import { MyMapComponent } from '../../my-map/my-map.component';
import { GeoLocationService } from '../../geo-location.service';
import { UploadImage } from '../../fileUpload/form-upload/form-upload.component';
import { ConfirmationDialogComponent, DialogData } from './confirmation-dialog.component';


@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})

export class NewEventFormComponent implements OnInit, AfterViewInit {
  //TODO: REFACTOR and simplify    
  @ViewChildren('map') 
  public maps : QueryList<MyMapComponent>
  private map: MyMapComponent;

  private isAuthorized: boolean;
  private _defaultLat: number = 38.72529650480368;
  private _defaultLng: number = -9.14989477783206;
  
  private newEventForm: FormGroup;
  private eventPosition = {lat: this._defaultLat, lng: this._defaultLng };
  private event: Event;
  private event$: ISubscription;
  private locker: string;
  private color: string;
  private images: UploadImage[];
  private hour: number;
  private marker: google.maps.Marker;
  private eventId: string;
  private isEditing: boolean;
  private dateValue = new FormControl(new Date());

  constructor(public fb: FormBuilder,
    private eventService: EventService, 
    private geo: GeoLocationService,
    private storage: AngularFireStorage,
    public auth: AuthService, 
    private router: Router, 
    public snackBar: MatSnackBar, 
    private afStorage: AngularFireStorage, 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef) {
      this.eventId = this.route.snapshot.paramMap.get('id');
      this.isEditing = this.eventId != null;
      this.isAuthorized = false;
      this.createForm();
      this.images = new Array();
  }

  ngOnInit() {
     // Listen to changes on the "address" field to update the google map
    this.location.valueChanges.pipe(
      filter(txt => txt.length >= 3),
      debounceTime(500),)
      .subscribe(address => this.mapGoToLocation(address));
}

ngOnDestroy() {
  if (this.event$) {
    this.event$.unsubscribe();
  }
}

  ngAfterViewInit() {
    this.maps.changes.subscribe((comps: QueryList <MyMapComponent>) => {
      console.log ('map changed visibility');
      if (comps.first) {
      this.map = comps.first; // Listens when map is ready and inits it
      this.initMap(this.eventPosition.lat, this.eventPosition.lng);
    }
    });

    this.isAuthorized = this.eventId ? false : true; // if doing a new event, user is authorized
    this.changeDetector.detectChanges();
    if (this.isEditing){
      this.initFilledForm(this.eventId);
    }
    else {

     this.initEmptyForm(); 
    } 
  
  }

  initFilledForm(eventId: string) { // Inits form with data from the event with the given ID

    
    this.event$ = this.eventService.getEvent(eventId).subscribe(e => {
      this.event = e;
      this.isAuthorized = (e.author === this.auth.uid); // authorizes the user if is the author
      this.changeDetector.detectChanges();
      console.log ( this.isAuthorized );
      this.eventPosition.lat = this.event.coordinates.latitude;
      this.eventPosition.lng = this.event.coordinates.longitude;
      this.description.setValue(this.event.description);
      this.date.setValue(this.event.date); 
      this.hour = this.event.hour;
      this.bikeBrand.setValue(this.event.bicycle.brand);
      this.bikeDescription.setValue(this.event.bicycle.description);
      this.bikeSerialNo.setValue(this.event.bicycle.serialNo);
      this.color = this.event.bicycle.color;
      this.locker = this.event.lockerType;

      this.images =  this.event.bicycle.images ? this.event.bicycle.images.map(img => (
        { id: img.id,
          path: img.path,
          name: img.name,
          size: img.size,
          downloadURL: img.downloadURL
        } as UploadImage)) : [];
       this.location.setValue(this.event.location);
  });
  }


  initEmptyForm() {
    this.date.setValue(new Date()); //init date with today
  }

  // Inits the map on the given coordinates, adds a central marker
  initMap(lat, lng) {
    const center = { lat: lat , lng: lng };
    //TODO: center around user location ?
    this.map.setCenter(center.lat, center.lng);
    this.map.setZoom(13);
    this.marker = new google.maps.Marker({ position: center, map: this.map.map });
    this.marker.setDraggable(true);
    this.marker.addListener('dragend', r => this.handleMarkerDrag(r));
  }

  /**
   * Deletes the current event and the associated images
   */
  delete() { 
    console.log("deleting...");
    this.event$.unsubscribe();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {title: "Tem a certeza que deseja apagar o registo?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Delete associated images from storage
      if (result === 'yes') {
        //this.event.bicycle.images.forEach(img => {
        //  this.afStorage.ref(`${img.path}`).delete();
        //});
    // Delete event
        this.eventService.deleteEvent(this.eventId)
          .then(res => {
            this.openSnackBar('Deleted with success', '');
            this.router.navigate(['/events/']);
          })
          .catch(err => {});
      }
    });

  
  }

  submit() {
    // creates the Object event and submits to the Event Service
    const event: Event = this.getEventFromForm();

    if (this.isEditing) {
      this.eventService.updateEvent(event).then(res => {
        this.openSnackBar('Edited with success', '');
        console.log (res);
        this.router.navigate(['/events/' + event.id]);
      }).catch(err => console.log({err}));
    } else {
    this.eventService.addEvent(event)
    .then(res => {
      this.openSnackBar('Added with success', '');
      this.router.navigate(['/' + res.path]);
    })
    .catch(err => console.log({err}));
  }
  }


  handleMarkerDrag(marker) {
    this.geo.getAddressFromCoordinates(marker.latLng).subscribe(addresses => {
      this.location.setValue(addresses[0].formatted_address.split(',')[0], { emitEvent: false });
    });
  }

  // Centers the map and marker on a given address
  mapGoToLocation(address: string) {
    this.geo.getCoordinates(address).subscribe(coords => {
      this.marker.setPosition(coords);
      this.map.setCenter(coords.lat, coords.lng);
    },
      err => console.log(err)); // TODO: handle error
  }


  /**
   * Returns an Event object based on the form data
   */
  getEventFromForm(): Event {
    var event: Event = {
    
      description: this.description.value,
      location: this.location.value,
      date: new Date(this.date.value),
      dateCreated: new Date(),
      author: this.auth.uid,
      lockerType: this.locker,
      hour: this.hour,
      views: 0,
      comments: [],
      coordinates: new firebase.firestore.GeoPoint(this.marker.getPosition().lat(),
        this.marker.getPosition().lng()),
      bicycle: ({
        color: this.color,
        serialNo: this.bikeSerialNo.value,
        brand: this.bikeBrand.value,
        description: this.bikeDescription.value,
        images: this.images ? this.images.map(img => (
          { id: img.id,
            path: img.path,
            name: img.name,
            size: img.size,
            downloadURL: img.downloadURL
          } as Image)) : [],
      } as Bicycle),
    } as Event;
    if (this.eventId){
      event.id = this.eventId;
    }
    return event;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // Creates the form
  createForm() {
    this.newEventForm = this.fb.group({
      description: '',
      location: '',
      date: '',
      bikeBrand: '',
      bikeSerialNo: '',
      bikeDescription: '',
    });
  }

  // Form fields getters
  get description() { return this.newEventForm.get('description'); }
  get location() { return this.newEventForm.get('location'); }
  get date() { return this.newEventForm.get('date'); }
  get bikeBrand() { return this.newEventForm.get('bikeBrand'); }
  get bikeSerialNo() { return this.newEventForm.get('bikeSerialNo'); }
  get bikeDescription() { return this.newEventForm.get('bikeDescription'); }



}
