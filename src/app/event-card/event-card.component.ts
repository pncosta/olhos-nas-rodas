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
  imageurl: string;
  defaultImage: string = '/assets/bicycle-placeholder.jpg';
  constructor(private eventService: EventService,  private users: UserService) {

   
   }

  ngOnInit() {
    this.getAuthor();
    this.imageurl = this.event.bicycle.images && this.event.bicycle.images.length > 0 ?
                    this.event.bicycle.images[0].downloadURL : this.defaultImage; 
  }

  delete(event: Event): void {
    this.eventService.deleteEvent(event)
    .then(res => {
      console.log(res); 
      this.deleted.emit(event);})
    .catch (err => console.error(err));
    
  }

  getAuthor(){
    this.author = this.users.getUser(this.event.author);
  }

}
