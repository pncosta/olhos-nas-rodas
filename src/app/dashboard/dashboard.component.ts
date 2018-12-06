import { Component, OnInit, AfterViewInit,  ViewChildren, ViewChild,  QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../events/event';
import { EventService } from '../events/event.service';
import { DistrictService } from '../districts/district.service';
import { MyMapComponent } from '../my-map/my-map.component';
 import * as MarkerClusterer from "@google/markerclustererplus";
//import { MarkerClusterer }  from "@google/markerclustererplus";
// declare var MarkerClusterer: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})


export class DashboardComponent implements AfterViewInit, OnInit {
 
  @ViewChild('map') map: MyMapComponent;

  events: Event[] = [];

  markers: google.maps.Marker[];

  

  constructor( private eventService: EventService,
  ) { 
    this.markers = new Array<google.maps.Marker>();
  }

  ngOnInit(){
 
  }


  ngAfterViewInit() {
    this.initMap();
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.events.forEach(e => this.addEventMarker(e));
      var markerCluster = new MarkerClusterer(this.map.map, this.markers);
    });
  }

  initMap() {

  }

  addEventMarker (e: Event) {
    const point = { lat: e.coordinates.latitude, lng: e.coordinates.longitude };
    const marker = new google.maps.Marker({ position: point });
    this.markers.push(marker);
  }


  
}
