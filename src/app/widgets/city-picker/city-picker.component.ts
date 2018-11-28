import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { District, City } from '../../districts/district';
import { DistrictService } from '../../districts/district.service';

@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss']
})
export class CityPickerComponent implements OnInit, OnChanges {
  @Input() district: District;
  private _city: City;
  filteredCities: City[];
  cities: City[];
  @Input() get city() { return this._city; }
  @Output() cityChange = new EventEmitter<City>();

  set city(val) {
    this._city = val;
    this.cityChange.emit(this._city);
  }

  constructor(private ds :DistrictService ) {
    this.getCities()
   }

   getCities() {
    this.ds.getCities().subscribe(
      c => {
        this.cities = c;
        this.cities.sort((a,b) => {
          return a.name.localeCompare(b.name, 'en', {sensitivity: 'base'})
          // Sorts the cities, ignoring any special characters (i.e: À,É)
        }); 
        this.filteredCities = this.getFilteredCities()}
    )
  }

  equals(o1: City, o2: City) {
    return o1.uid === o2.uid;
 }

   ngOnChanges() {

   this.filteredCities = this.getFilteredCities();
   

   }

   getFilteredCities() {
     
    return this.district && this.cities
          ? this.cities.filter(c => c.district === this.district.uid)
          : this.cities;
   }
  ngOnInit() {
  }

}
