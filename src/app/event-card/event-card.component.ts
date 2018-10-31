import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../events/event';
import { EventService } from '../events/event.service';
import { UserService } from '../core/user.service';
import { User } from '../core/auth.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})

export class EventCardComponent implements OnInit {
  @Input() event: Event;
  @Output() deleted: EventEmitter<Event> = new EventEmitter();
  author: Observable<User>;
  constructor(private eventService: EventService,  private users: UserService) { }

  ngOnInit() {
    this.getAuthor();
  }

  delete(event: Event): void {
    this.eventService.deleteEvent(event).subscribe();
    this.deleted.emit(event);
  }

  getAuthor(){
    this.author = this.users.getUser(this.event.author);
  }

}
