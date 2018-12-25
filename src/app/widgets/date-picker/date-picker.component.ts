import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
   @Input() placeholder: string ;

    _date ;
   @Input() get date() { return this._date; }
   @Output() dateChange = new EventEmitter<any>();
 
   set date(val) {
     this._date = val;
     this.dateChange.emit(this._date);
   }

  constructor() { }

  ngOnInit() {

  }

}
