import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";
import { Event } from './event';
import { EventService, Filter } from './event.service';
import * as _ from "lodash";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];
  filteredEvents: Event[];
  orderBy: string = 'dateCreated'; // TODO: optional order by
  searchText: string;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.getAndFilterEvents();
  }


  /* Methods for complete query with client side filtering */
  getAndFilterEvents() {
    this.eventService.getEvents('dateCreated').subscribe(events => {
      this.events = events;
      this.applyFilters()
    })
  }

  applyFilters() {
    // client side filtering as firebase does not support proper queries on text
    // TODO: a free solution that scales 
    // based on https://angularfirebase.com/lessons/multi-property-data-filtering-with-firebase-and-angular-4/
    this.filteredEvents = this.events.filter((e: Event) => Event.contains(e, this.searchText));
  }
}
