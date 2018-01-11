import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[];
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
    .subscribe(events => this.events = events);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.eventService.addEvent({ name } as Event)
      .subscribe(event => {
        this.events.push(event);
      });
  }

  onDelete(event: Event): void {
    this.events = this.events.filter(e => e !== event);
  }

}