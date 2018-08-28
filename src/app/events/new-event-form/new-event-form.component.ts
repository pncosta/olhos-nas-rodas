import { Location } from '@angular/common';
import 'rxjs/add/operator/debounceTime';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '../event';
import { EventService } from '../event.service';
import { Bicycle } from '../../bicycle';
import { MyMapComponent } from '../../my-map/my-map.component';
import { GeoLocationService } from '../../geo-location.service';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map: MyMapComponent;
  some ;
  newEventForm: FormGroup;
  dateValue = new FormControl(new Date());
  marker: google.maps.Marker;


  constructor( public fb: FormBuilder, private eventService: EventService, private geo: GeoLocationService ) {
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
    // init map
    const center = {lat: 38.72529650480368, lng: -9.14989477783206};
    this.map.setCenter(center.lat, center.lng);
    this.map.setZoom(13);
    this.marker = new google.maps.Marker({position: center, map: this.map.map});
    this.marker.setDraggable(true);
    this.marker.addListener('dragend', r => this.handleMarkerDrag(r));
    //init date with today
    this.date.setValue(new Date()); 
  }

  submit() {
    // creates the Object event and submits to the Event Service
    const event: Event = this.getEventFromForm();
    this.eventService.addEvent(event);
  }

   handleMarkerDrag(marker) {
    this.geo.getAddressFromCoordinates(marker.latLng).subscribe(addresses => {
      this.location.setValue(addresses[0].formatted_address.split(',')[0], {emitEvent: false});
    });
  }

  getEventFromForm(): Event {
    return ({ title:  this.title.value,
              description:  this.description.value,
              location:  this.location.value,
              date: new Date(this.date.value),
              hour: this.hour,
              coordinates : new firebase.firestore.GeoPoint(this.marker.getPosition().lat(),
                                                            this.marker.getPosition().lng()),
              bicycle: ({
                color: this.bikeColor.value,
                serialNo: this.bikeSerialNo.value,
                title: this.bikeBrand.value,
                description: this.bikeDescription.value
              } as Bicycle),
            } as Event);
  }

  // Centers the map and marker on a given address
  mapGoToLocation(address: string) {
    this.geo.getCoordinates(address)
    .subscribe(coords => {
      // this.map.setCoordinates(coords);
      this.marker.setPosition(coords);
    },
      err => console.log(err)); // TODO: handle error
  }

  // Creates the form
  createForm() {
    this.newEventForm = this.fb.group({
      title: '',
      description: '',
      location: '',
      date: '',
      hour: '',
      lockerType: '',
      bikeBrand: '',
      bikeSerialNo: '',
      bikeColor: '',
      bikeDescription: '',
    });
  }


    // Form fields getters
    get title() { return this.newEventForm.get('title'); }
    get description() { return this.newEventForm.get('description'); }
    get location() { return this.newEventForm.get('location'); }
    get date() { return this.newEventForm.get('date'); }
    get hour() { return this.newEventForm.get('hour'); }
    get lockerType() { return this.newEventForm.get('lockerType'); }
    get bikeBrand() { return this.newEventForm.get('bikeBrand'); }
    get bikeSerialNo() { return this.newEventForm.get('bikeSerialNo'); }
    get bikeColor() { return this.newEventForm.get('bikeColor'); }
    get bikeDescription() { return this.newEventForm.get('bikeDescription'); }

}
