import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { } from '@types/googlemaps';
import { Event } from '../event';
import { EventService } from '../event.service';
import { Bicycle } from '../../bicycle';


@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  newEventForm: FormGroup;
  dateValue = new FormControl(new Date());
  

  constructor( public fb: FormBuilder, private eventService: EventService ) {
    this.createForm();
   }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  submit() {
    console.log('submitting');
    const event: Event = this.getEventFromForm();

    this.eventService.addEvent(event);
    /*.subscribe(e => {
      console.log(e);
    });*/
    // TODO: handle error//success ?
    // TODO: go back to event list.
  }

  getEventFromForm(): Event {
    return ({ title:  this.title.value,
              description:  this.description.value,
              location:  this.location.value,
              date: new Date(this.date.value),
              bicycle: ({
                color: this.bikeColor.value,
                serialNo: this.bikeSerialNo.value,
                title: this.bikeBrand.value,
                description: this.bikeDescription.value
              } as Bicycle),
            } as Event);
  }

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
