import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DistrictService } from '../../districts/district.service';
import { District } from '../../districts/district';

@Component({
  selector: 'app-district-picker',
  templateUrl: './district-picker.component.html',
  styleUrls: ['./district-picker.component.scss']
})
export class DistrictPickerComponent implements OnInit {
  private _district: District ;
  @Input() get district() { return this._district; }
  @Output() districtChange = new EventEmitter<District>();

  districts: District[];

  set district(val) {
    this._district = val;
    this.districtChange.emit(this._district);
  }


 
  constructor(private districtService: DistrictService) { 
    this.getDistricts();

  }

  getDistricts() {
    this.districtService.getDistricts().subscribe(
      d => {
        this.districts = d;
        this.districts.sort((a,b) => {
          return a.name.localeCompare(b.name, 'en', {sensitivity: 'base'})
          // Sorts districts, ignoring any special characters (i.e: À,É)
        }); 
      } 
    )
  }

  ngOnInit() {

  }

  equals(d1: District, d2: District) {
    return d1.uid === d2.uid;
 }
}
