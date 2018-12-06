import { Component, OnInit, OnDestroy, Input, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Event } from '../events/event';
import { ActivatedRoute } from '@angular/router';
import { Observable ,  SubscriptionLike as ISubscription } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage'
import { Location } from '@angular/common';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { EventService } from '../events/event.service';
import { User } from '../core/auth.service';
import { MyMapComponent } from '../my-map/my-map.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SendMessageDialogComponent } from '../messages/send-message-dialog/send-message-dialog.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  event: Event;

  @ViewChildren('map') 
  public maps : QueryList<MyMapComponent>
  private map: MyMapComponent;
  private author$: Observable<User>;
  private author: User;
  private photoUrl: Observable<string | null>;
  private photos: Array<string>;
  private canEdit;
  private event$: ISubscription;

  constructor( private route: ActivatedRoute,
    public dialog: MatDialog,
    private auth: AuthService,
    private eventService: EventService,
    private location: Location, 
    private users: UserService,
    private storage: AngularFireStorage) {
      this.photos = [];
      this.canEdit=false;
     }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.event$){
      this.event$.unsubscribe();
    }
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
    this.event$ = this.eventService.getEvent(this.route.snapshot.paramMap.get('id'))
      .subscribe(event => {
        this.event = event; 
        this.canEdit = this.auth && this.event.author === this.auth.uid;
        this.photos = this.event.bicycle.images.map(img => img.downloadURL);
        this.getAuthor();
       });
      
  }
  
  getAuthor(){
    this.author$ = this.users.getUser(this.event.author);
    this.author$.subscribe(u => this.author = u);
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

  openMessageDialog(): void {
    const dialogRef = this.dialog.open(SendMessageDialogComponent, {
      width: '80vw',
      data: { event: this.event,
              author: this.author
            }
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}

