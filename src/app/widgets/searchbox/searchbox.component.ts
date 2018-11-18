import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  @Input() searchText: string;
  @Input() debounce: any = 500;
  @Output() searchTextChange:  EventEmitter<string> = new EventEmitter();

  private searchText$: Subject<string> = new Subject<string>();

  constructor() { 
    this.searchText$ // gets the changes on searchText and debounces them 
    .pipe(debounceTime(this.debounce), distinctUntilChanged())
    .subscribe(model => {
        this.searchTextChange.emit(this.searchText);
    });

  }

  ngOnInit() {
  }

  searchTextChanged() {
    this.searchText$.next(this.searchText);

  }

}
