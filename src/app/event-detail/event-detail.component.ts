import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../events/event';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage'
import { Location } from '@angular/common';
import { EventService } from '../events/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  private photoUrl: Observable<string | null>;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location, 
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    this.eventService.getEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe(event => {
        this.event = event; 
        this.getPhotosUrls()});
  }

  getPhotosUrls(): void {
    this.event.bicycle.images.forEach( r => {
      console.log(r);
      const ref = this.storage.ref(r);
      
      ref.getDownloadURL().subscribe(val => 
        this.photoUrl = val)
    });

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
