import { Component, OnInit, Input, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Event } from '../events/event';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage'
import { Location } from '@angular/common';
import { UserService } from '../core/user.service';
import { EventService } from '../events/event.service';
import { User } from '../core/auth.service';
import { MyMapComponent } from '../my-map/my-map.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, AfterViewInit {
  event: Event;


  @ViewChildren('map') 
  public maps : QueryList<MyMapComponent>
  private map: MyMapComponent;
  private author: Observable<User>;
  private photoUrl: Observable<string | null>;
  private photos: Array<string>;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location, 
    private users: UserService,
    private storage: AngularFireStorage) {
      this.photos = [];
     }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.getEvent();
    this.eventService.incrementViewCounter(this.route.snapshot.paramMap.get('id'));
    this.maps.changes.subscribe((comps: QueryList <MyMapComponent>) => {
        this.map = comps.first
        this.initMap()
      }
    );
  }

  getEvent(): void {
    const f = this.eventService.getEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe(event => {
        this.event = event; 
        this.getPhotosUrls();
        this.getAuthor();
       });
  }
  
  getAuthor(){
    this.author = this.users.getUser(this.event.author);
  }

  getPhotosUrls(): void {
    this.event.bicycle.images.forEach( r => {
      const ref = this.storage.ref(r);
      
      ref.getDownloadURL().subscribe(val =>  {
        if (this.photos.indexOf(val) < 0)
          this.photos.push(val)
        })
    });
  }

  initMap() {
    const center = { lat: this.event.coordinates.latitude, lng: this.event.coordinates.longitude };
    this.map.setCenter(center.lat, center.lng);
    this.map.setZoom(15);
    this.map.map.setOptions ({draggable: false});
    const marker = new google.maps.Marker({ position: center, map: this.map.map });
    marker.setDraggable(false);
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
