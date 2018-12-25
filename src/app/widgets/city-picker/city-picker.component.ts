import { Component, OnInit, OnChanges, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { District, City } from '../../districts/district';
import { DistrictService } from '../../districts/district.service';
import { ControlValueAccessor } from "@angular/forms";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityPickerComponent),
      multi: true
    }
  ],
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss']
})
export class CityPickerComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() district: District;
  @Input() get city() { return this._city; }
  @Output() cityChange = new EventEmitter<City>();
  
  private _city: City;
  cities: City[];
  filteredCities: City[];

  set city(val) {
    this._city = val;
    this.onChange(val);
    this.cityChange.emit(this._city);
  }

  constructor(private ds: DistrictService) {
    this.getCities()
  }

  /** ControlValueAccessor Implementation **/ 

  onChange: any = () => { };

  onTouched: any = () => { };

  writeValue(value: any): void { this.city = value; }

  registerOnChange(fn: any): void { this.onChange = fn; }
  
  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void { console.error ("Not Implemented"); }


  getCities() {
    this.ds.getCities().subscribe(
      c => {
        this.cities = c;
        this.cities.sort((a, b) => {
          return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
          // Sorts the cities, ignoring any special characters (i.e: À,É)
        });
        this.filteredCities = this.getFilteredCities()
      }
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

  ngOnInit() { }

}
