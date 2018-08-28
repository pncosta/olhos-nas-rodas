import { Location } from '@angular/common';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../event';
import { EventService } from '../event.service';
import { AuthService } from '../../core/auth.service';
import { Bicycle } from '../../bicycle';
import { MyMapComponent } from '../../my-map/my-map.component';
import { GeoLocationService } from '../../geo-location.service';
import { Image } from '../../fileUpload/form-upload/form-upload.component';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})

export class NewEventFormComponent implements OnInit, AfterViewInit {

  @ViewChild('map') map: MyMapComponent;
  images: Image[];
  locker: string;
  color: string;
  hour: number;
  marker: google.maps.Marker;
  newEventForm: FormGroup;
  dateValue = new FormControl(new Date());

  constructor(public fb: FormBuilder,
    private eventService: EventService,
    private geo: GeoLocationService,
    public auth: AuthService,
    private router: Router, 
    public snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit() {
    // Listen to changes on the "address" field to update the google map
    this.location.valueChanges
      .filter(txt => txt.length >= 3)
      .debounceTime(500)
      .subscribe(address => this.mapGoToLocation(address));
  }

  ngAfterViewInit() {
    this.initMap(); // init map
    this.date.setValue(new Date()); //init date with today
  }

  initMap() {
    const center = { lat: 38.72529650480368, lng: -9.14989477783206 };
    //TODO: center around user location ?
    this.map.setCenter(center.lat, center.lng);
    this.map.setZoom(13);
    this.marker = new google.maps.Marker({ position: center, map: this.map.map });
    this.marker.setDraggable(true);
    this.marker.addListener('dragend', r => this.handleMarkerDrag(r));
  }

  submit() {
    // creates the Object event and submits to the Event Service
    const event: Event = this.getEventFromForm();
    this.eventService.addEvent(event)
    .then(res => {
      console.log(res.path);
      this.openSnackBar('Added with success', '');
      this.router.navigate(['/' + res.path]);
     
    })
    .catch(err => console.log({err}));
  }

  handleMarkerDrag(marker) {
    this.geo.getAddressFromCoordinates(marker.latLng).subscribe(addresses => {
      this.location.setValue(addresses[0].formatted_address.split(',')[0], { emitEvent: false });
    });
  }

  getEventFromForm(): Event {
    console.log(this.images);
    var event: Event = {
      description: this.description.value,
      location: this.location.value,
      date: new Date(this.date.value),
      dateCreated: new Date(),
      author: this.auth.uid,
      lockerType: this.locker,
      hour: this.hour,
      coordinates: new firebase.firestore.GeoPoint(this.marker.getPosition().lat(),
        this.marker.getPosition().lng()),
      bicycle: ({
        color: this.color,
        serialNo: this.bikeSerialNo.value,
        brand: this.bikeBrand.value,
        description: this.bikeDescription.value,
        images: this.images ? this.images.map(img => img.path) : [],
      } as Bicycle),
    } as Event;
    console.log({ event });
    return event;
  }

  // Centers the map and marker on a given address
  mapGoToLocation(address: string) {
    this.geo.getCoordinates(address).subscribe(coords => {
      this.marker.setPosition(coords);
    },
      err => console.log(err)); // TODO: handle error
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
