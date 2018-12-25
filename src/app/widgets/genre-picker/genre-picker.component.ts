import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Genre {
  value: number;
  viewValue: string;
  viewValuePt: string;
} 

@Component({
  selector: 'app-genre-picker',
  templateUrl: './genre-picker.component.html',
  styleUrls: ['./genre-picker.component.scss']
})


export class GenrePickerComponent implements OnInit {

  private _genre: Genre ;
  @Input() get genre() { return this._genre; }
  @Output() genreChange = new EventEmitter();
  
  set genre(val) {
    this._genre = val;
    this.genreChange.emit(this._genre);
  }

  genres:  Genre[] = [
    {value: 0, viewValue: 'Female', viewValuePt: 'Homem'},
    {value: 1, viewValue: 'Male', viewValuePt: 'Mulher'},
    {value: 2, viewValue: 'Other/Rather not say', viewValuePt: 'Outro/Prefiro não dizer'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
