import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  gmap: google.maps.Map;
  constructor() { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(38.736946, -9.142685),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.gmap = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  addMarker(lat: number, lng: number) {
    const latLng = new google.maps.LatLng(lat, lng);

  }

  get map(): google.maps.Map { return this.gmap; }

  setMapType(mapTypeId: string) {
    this.gmap.setMapTypeId(mapTypeId);
}

setCenter(lat: number, lng: number) {
  this.gmap.setCenter(new google.maps.LatLng(lat, lng));
}

setCoordinates(coords: google.maps.LatLng) {
  this.gmap.setCenter(coords);
}

setZoom(zoom: number) {
  this.gmap.setZoom(zoom);
}
}
