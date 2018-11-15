import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from './event';
import { EventService } from './event.service';
import * as _ from "lodash";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // TODO: implement infinit scrolling? see material angular v7 virtual scroll

  events: Event[];
  offset = 3;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;

  serial = "a"

  constructor(private eventService: EventService
  ) { }

  ngOnInit() {

    this.getEvents();
  }

  nextPage() {
    this.prevKeys.push(_.first(this.events)['dateCreated']) // set current key as pointer for previous page
    this.getEvents(this.nextKey)
  }
  prevPage() {
    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array

    this.getEvents(prevKey)
  }

  private getEvents(key?) {
    if (key == undefined) { //get first page
      this.subscription = this.eventService.getFirstPage(this.offset)
      .subscribe(events => this.handleEventsResponse(events));
    }
    else { // get page after key
      this.subscription = this.eventService.getPageAfter(this.offset, key)
        .subscribe(events => this.handleEventsResponse(events))

    }
  }

  private handleEventsResponse(events: Event[]) {
    this.nextKey =_.get(events[this.offset], 'dateCreated')
    this.events = _.slice(events, 0, this.offset)
  }




}
