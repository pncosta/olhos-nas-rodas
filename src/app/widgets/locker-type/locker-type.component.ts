import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Locker {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-locker-type',
  templateUrl: './locker-type.component.html',
  styleUrls: ['./locker-type.component.css']
})
export class LockerTypeComponent implements OnInit {
  private _locker: string ;
  @Input() get locker() { return this._locker; }
  @Output() lockerChange = new EventEmitter();
  
  set locker(val) {
    this._locker = val;
    this.lockerChange.emit(this._locker);
  }

  lockers:  Locker[] = [
    {value: 'lock-0', viewValue: 'U-Lock'},
    {value: 'lock-1', viewValue: 'Corrente'},
    {value: 'lock-2', viewValue: 'Corrente de elos grossos'},
    {value: 'lock-3', viewValue: 'Outro'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
