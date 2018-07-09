import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../events/event';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { EventService } from '../events/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    this.eventService.getEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe(event => this.event = event);
  }

  save(): void {
    this.eventService.updateEvent(this.event);
  // TODO handle sucess, error    .subscribe(() =>
   this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
