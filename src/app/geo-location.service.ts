import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  geoLocationURL = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyC9M3NT7JBnTeXRO9MYsnnWq7gP-7SYWWI&address=';
  constructor(private http: HttpClient) { }

  getCoordinates (address: string) {
    return this.http.get(this.geoLocationURL.concat(address))
    .map(response => response['results'][0]['geometry']['location'] );
  }
}
