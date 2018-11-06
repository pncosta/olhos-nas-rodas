import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Event } from '../event';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  event: Event;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  submit(){
    console.log(event);
  }

}
