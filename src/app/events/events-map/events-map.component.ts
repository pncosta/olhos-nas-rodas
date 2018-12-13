import { Component, OnInit, AfterViewInit,  ViewChildren, ViewChild,  QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as MarkerClusterer from "@google/markerclustererplus";
import { Event } from '../event';
import { EventService } from '../event.service';
import { DistrictService } from '../../districts/district.service';
import { MyMapComponent } from '../../my-map/my-map.component';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.scss']
})
export class EventsMapComponent implements AfterViewInit, OnInit {
  
   @ViewChild('map') map: MyMapComponent;
   events: Event[] = [];
   markers: google.maps.Marker[];
 
   constructor( private eventService: EventService) { 
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
    //TODO: center around user location ?
    this.map.setZoom(11);
 
   }
 
   addEventMarker (e: Event) {
     const point = { lat: e.coordinates.latitude, lng: e.coordinates.longitude };
     const marker = new google.maps.Marker({ position: point });
     this.markers.push(marker);
   }

 }
 