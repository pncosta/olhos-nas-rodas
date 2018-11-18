import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/internal/operators";
import { Event } from './event';
import { EventService, Filter } from './event.service';
import * as _ from "lodash";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // TODO: implement infinit scrolling? see material angular v7 virtual scroll

  events: Event[];
  filteredEvents: Event[];
  filters = {};

  // Variables needed for paginated queries
  offset = 3;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;
  orderBy = 'dateCreated'
  searchText : string;
  searchTextChanged: Subject<string> = new Subject<string>();
  queryFilters: Filter[];
  

  constructor(private eventService: EventService) {
    this.filters = new Array();
    this.searchTextChanged // gets the changes on searchText and debounces them 
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe(model => {
        this.searchText = model;
        this.applyFilters();
    });
   }

  ngOnInit() {

    // this.getEvents();
    this.getAndFilterEvents();
  }


/* Methods for complete query with client side filtering */
    getAndFilterEvents () {
  this.eventService.getEvents().subscribe (events => {
  this.events = events;
  this.applyFilters()
})
    }

    searchTextChange () {
      this.searchTextChanged.next(this.searchText);
    }

    applyFilters() {


      // client side filtering as firebase doesnt support much better :( 
      // TODO: search a free solution that scales 
      // based on https://angularfirebase.com/lessons/multi-property-data-filtering-with-firebase-and-angular-4/
    this.filteredEvents = this.events.filter( (e: Event) => Event.contains(e, this.searchText));
    }




  /* Legacy Methods for PAGINATED queries with attemp on server side filters - WIP
  nextPage() {
    this.prevKeys.push(_.first(this.events)['dateCreated']); // set current key as pointer for previous page
    this.getEvents(this.nextKey);
  }

  prevPage() {
    const prevKey = _.last(this.prevKeys); // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys); // then remove the last key in the array

    this.getEvents(prevKey);
  }

  private searchWithFilters() {
    this.filters = new Array();
      if (this.searchText && this.searchText.length > 0) {
        var f : Filter = {
          field: 'location',  
          operator: '==',
          value: this.searchText
        };
      this.queryFilters.push(f);
    }
  
    this.getEvents();

  }

  private getEvents(key?) {
    if (key == undefined) { //get first page
      this.subscription = this.eventService.getFirstPage(this.orderBy, this.offset, this.queryFilters)
      .subscribe(events => this.handleEventsResponse(events));
    }
    else { // get page after key
      this.subscription = this.eventService.getFirstPage(this.orderBy, this.offset, this.queryFilters, key)
        .subscribe(events => this.handleEventsResponse(events));

    }
  } */

  private handleEventsResponse(events: Event[]) {
    this.nextKey =_.get(events[this.offset], this.orderBy);
    this.events = _.slice(events, 0, this.offset);
  }




}
