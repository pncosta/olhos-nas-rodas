import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Color {
  value: string;
  viewValue: string;
} 

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  private _color: Color ;
  @Input() get color() { return this._color; }
  @Output() colorChange = new EventEmitter();
  
  set color(val) {
    this._color = val;
    this.colorChange.emit(this._color);
  }

  colors:  Color[] = [
    {value: 'black', viewValue: 'Black'},
    {value: 'white', viewValue: 'White'},
    {value: 'orange', viewValue: 'Orange'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'red', viewValue: 'Red'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'green', viewValue: 'Green'},
    {value: 'other', viewValue: 'Other'},
   
  ];

  constructor() { }

  ngOnInit() {
  }

}
