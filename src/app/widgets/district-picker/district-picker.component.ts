import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DistrictService } from '../../districts/district.service';
import { District } from '../../districts/district';
import { MatSelectChange, MatSelect } from '@angular/material/select';

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DistrictPickerComponent),
      multi: true
    }
  ],
  selector: 'app-district-picker',
  templateUrl: './district-picker.component.html',
  styleUrls: ['./district-picker.component.scss']
})

// TODO: Refactor - check how to do implement ControlValueAccessor correctly
// https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83
// https://netbasal.com/angular-custom-form-controls-made-easy-4f963341c8e2
// https://stackoverflow.com/questions/50756634/angular-component-that-implements-controlvalueaccessor-fails-for-two-way-binding
export class DistrictPickerComponent implements OnInit, ControlValueAccessor {

  @Input() get district() { return this._district; }
  @Output() districtChange = new EventEmitter<District>();

  private _district: District;
  districts: District[];

  set district(val) {
    this._district = val;
    this.onChange(val);
    this.districtChange.emit(this._district);
  }

  constructor(private districtService: DistrictService) {
    this.getDistricts();
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  writeValue(value: any): void { 
    this._district = value; 
  }

  registerOnChange(fn: any): void { this.onChange = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void { console.error("Not Implemented"); }

  getDistricts() {
    this.districtService.getDistricts().subscribe(
      d => {
        this.districts = d;
        this.districts.sort((a, b) => {
          return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
          // Sorts districts, ignoring any special characters (i.e: À,É)
        });
      }
    )
  }

  ngOnInit() { }

  equals(d1: District, d2: District) {
    return d1.uid === d2.uid;
  }
}
