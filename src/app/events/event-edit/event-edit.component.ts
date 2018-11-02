import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../../core/user.service';
import { Event } from '../event';
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
    event: Event;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location, 
    private users: UserService) {
    }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getEvent();
  }

  getEvent(): void {
    const f = this.eventService.getEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe(event => {
        this.event = event; 
       });
  }

}
