import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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

export class EventCardComponent implements OnInit, OnChanges {
  @Input() event: Event;
  author: Observable<User>;
  imageurl: string;
  createdDate;
  defaultImage: string = '/assets/bicycle placeholder.png';
  constructor(private eventService: EventService,  private users: UserService) {
    
   
   }

   ngOnChanges() {
    this.getAuthor();
    this.imageurl = this.event.bicycle.images && this.event.bicycle.images.length > 0 
      ? this.event.bicycle.images[0].downloadURL 
      : this.defaultImage; 
   }

  ngOnInit() {
  }

  getAuthor(){
    this.author = this.users.getUser(this.event.author);
  }

}
