import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Event } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  events: Event[];
  private events$: ISubscription;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.events$ = this.eventService.getEvents()
    .subscribe(events => this.events = events);
  }

  onDelete(event: Event): void {
    this.events = this.events.filter(e => e !== event);
  }

  ngOnDestroy() {
    this.events$.unsubscribe();
  }

}
