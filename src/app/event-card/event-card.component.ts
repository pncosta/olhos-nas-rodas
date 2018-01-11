import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../events/event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  @Output() deleted: EventEmitter<Event> = new EventEmitter();
  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  delete(event: Event): void {
    this.eventService.deleteEvent(event).subscribe();
    this.deleted.emit(event);
  } 

}
