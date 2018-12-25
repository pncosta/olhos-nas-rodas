import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";

export interface Color {
  value: string;
  viewValue: string;
  viewValuePt: string;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ],
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  @Input() get color() { return this._color ? this._color : undefined }
  @Output() colorChange = new EventEmitter();
  private _color: Color;

  set color(val) {
    this._color = val;
    this.onChange(val);
    this.colorChange.emit(this._color);
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  writeValue(value: any): void {
    this._color = value;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void { console.error("Not Implemented"); }


  public static colors: Color[] = [
    { value: 'black', viewValue: 'Black', viewValuePt: 'Preta' },
    { value: 'white', viewValue: 'White', viewValuePt: 'Branca' },
    { value: 'orange', viewValue: 'Orange', viewValuePt: 'Laranja' },
    { value: 'yellow', viewValue: 'Yellow', viewValuePt: 'Amarela' },
    { value: 'red', viewValue: 'Red', viewValuePt: 'Vermelha' },
    { value: 'blue', viewValue: 'Blue', viewValuePt: 'Azul' },
    { value: 'green', viewValue: 'Green', viewValuePt: 'Verde' },
    { value: 'pink', viewValue: 'Pink', viewValuePt: 'Rosa' },
    { value: 'gray', viewValue: 'Gray', viewValuePt: 'Cinzenta' },
    { value: 'other', viewValue: 'Other', viewValuePt: 'Outra' },

  ];

  get colors() { return ColorPickerComponent.colors }

  constructor() { }

  ngOnInit() {
  }

}
