import { Component, OnInit, Input } from '@angular/core';
import { Bicycle } from '../../bicycle';
@Component({
  selector: 'app-bicycle-image',
  templateUrl: './bicycle-image.component.html',
  styleUrls: ['./bicycle-image.component.scss']
})
export class BicycleImageComponent implements OnInit {
  @Input() bicycle: Bicycle;
  imageURL : string;
  constructor() { }

  ngOnInit() {

    this.imageURL = this.bicycle.images && this.bicycle.images.length > 0 
    ? this.bicycle.images[0].downloadURL 
    : undefined; 

  }



}
