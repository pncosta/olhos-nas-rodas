import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
@Component({
  selector: 'app-last-events',
  templateUrl: './last-events.component.html',
  styleUrls: ['./last-events.component.scss']
})
export class LastEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents('dateCreated', 3).subscribe(events => {
      this.events = events;
      
    });
  }

}
