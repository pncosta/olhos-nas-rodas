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
  selectedValue = "";

  @Input() get locker() { return this.selectedValue; }
  @Output() lockerChange = new EventEmitter();

  set locker(val) {
    this.selectedValue = val;
    this.lockerChange.emit(this.selectedValue);
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
