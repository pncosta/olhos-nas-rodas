import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef } from "@angular/core";

export interface Locker {
  value: string;
  viewValue: string;
  viewValuePt: string;
}

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LockerTypeComponent),
      multi: true
    }
  ],
  selector: 'app-locker-type',
  templateUrl: './locker-type.component.html',
  styleUrls: ['./locker-type.component.css']
})
export class LockerTypeComponent implements OnInit, ControlValueAccessor {

  @Input() get locker() { return this._locker; }
  @Output() lockerChange = new EventEmitter();
  private _locker: string;

  set locker(val) {
    this._locker = val;
    this.onChange(val);
    this.lockerChange.emit(this._locker);
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  writeValue(value: any): void {
    this._locker = value;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }

  setDisabledState?(isDisabled: boolean): void { console.error("Not Implemented"); }

  public static lockers: Locker[] = [
    { value: 'lock-0', viewValue: 'U-Lock', viewValuePt: 'Cadeado em U' },
    { value: 'lock-1', viewValue: 'Small chain', viewValuePt: 'Corrente fina' },
    { value: 'lock-2', viewValue: 'Strong chain', viewValuePt: 'Corrente de elos grossos' },
    { value: 'lock-3', viewValue: 'Other', viewValuePt: 'Outro tipo de cadeado' },
  ];

  get lockers() { return LockerTypeComponent.lockers }

  constructor() { }

  ngOnInit() {
  }

}
