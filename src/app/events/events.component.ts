import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];
  
  constructor(private eventService: EventService,
             
  ) { }

  ngOnInit() {

    
    this.eventService.getEvents()
    .subscribe(events => this.events = events);
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      // this.eventService.getNextPage();;
    }
    // should log top or bottom
  }

  


}
