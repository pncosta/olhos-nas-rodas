import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";

export interface Hour {
  value: string;
  viewValue: string;
  viewValuePt: string;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ],
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {

  @Input() get hour() { return this._hour ? this._hour : undefined }
  @Output() hourChange = new EventEmitter();
  private _hour: Hour;

  set hour(val) {
    this._hour = val;
    this.onChange(val);
    this.hourChange.emit(this._hour);
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  writeValue(value: any): void {
    console.log ('setting' + value) ;
    this._hour = value;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void { console.error("Not Implemented"); }

  hours: Hour[] = [
    { value: "0", 
      viewValue: 'Night - Between 00h a 08h', 
      viewValuePt : 'Madrugada - Entre a 00h e as 08h' },
    /*  {value: 1, viewValue: '01 h'},
      {value: 2, viewValue: '02 h'},
      {value: 3, viewValue: '03 h'},
      {value: 4, viewValue: '04 h'},
      {value: 5, viewValue: '05 h'},
      {value: 6, viewValue: '06 h'},
      {value: 7, viewValue: '07 h'}, */
    { value: "8", 
      viewValue: 'Morning - Between 08h and 12h',
      viewValuePt : 'Manhã - Entre as 08h e as 12h' },
    /* {value: 9, viewValue: '09 h'},
     {value: 10, viewValue: '10 h'},
     {value: 11, viewValue: '11 h'}, */
    { value: "12", 
      viewValue: 'Tarde - From 12h to 18h',
      viewValuePt : 'Entre as 12 e as 18h' },
    /*  {value: 13, viewValue: '13 h'},
      {value: 14, viewValue: '14 h'},
      {value: 15, viewValue: '15 h'},
      {value: 16, viewValue: '16 h'},
      {value: 17, viewValue: '17 h'},*/
    { value: "18", 
      viewValue: 'Evening - From 18 h to 00h',
      viewValuePt : 'Noite - Entre as 18h e a 00h' },
    /*  {value: 19, viewValue: '19 h'},
      {value: 20, viewValue: '20 h'},
      {value: 21, viewValue: '21 h'},
      {value: 22, viewValue: '22 h'},
      {value: 23, viewValue: '23 h'}, */
  ];


  constructor() { }

  ngOnInit() {
  }

}
