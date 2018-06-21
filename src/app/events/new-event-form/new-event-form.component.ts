
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { EventService } from '../event.service';
import { Event } from '../event';

@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {

  newEventForm: FormGroup;

  constructor( public fb: FormBuilder, private eventService: EventService ) {
    this.createForm();
   }

  ngOnInit() {
  }

  submit() {
    console.log('submitting');
    const event: Event = this.getEventFromForm();

    this.eventService.addEvent(event)
    .subscribe(e => {
      console.log(e);
    });
    console.log('submited');
    // this.eventService.addEvent( event );
  }

  getEventFromForm(): Event {
    return ({ title: 'teste',
             description: 'description'} as Event);
  }

  createForm() {
    this.newEventForm = this.fb.group({
      title: '',
      description: '',
      location: '',
      date: '',
    });
  }

}
