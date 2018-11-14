
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  geoLocationURL = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyC9M3NT7JBnTeXRO9MYsnnWq7gP-7SYWWI&address=';
  geocoder;
  
  constructor(private http: HttpClient) {
    this.geocoder = new google.maps.Geocoder;
   }

  getCoordinates (address: string) {
    return this.http.get(this.geoLocationURL.concat(address)).pipe(
    map(response => response['results'][0]['geometry']['location'] ));
  }

  getAddressFromCoordinates (position: google.maps.LatLng): Observable<any> {
    return new Observable((observer) => {
      this.geocoder.geocode({'location': position}, (res, status) => {
        if (status === 'OK') {
          observer.next(res);
          observer.complete()
        }
        else {
          console.log(status);
          observer.error(status);
        }
      });
  });
  }
}
