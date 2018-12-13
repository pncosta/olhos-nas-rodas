import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bicycle-image-placeholder',
  templateUrl: './bicycle-image-placeholder.component.html',
  styleUrls: ['./bicycle-image-placeholder.component.scss']
})
export class BicycleImagePlaceholderComponent implements OnInit {

  @Input() color: string;

  private c = {
    black: '#000',
    white: '#eee',
    orange: '#f39c12',
    yellow: '#f1c40f',
    red: '#FF5722',
    blue: '#2196F3',
    green: '#3ab580',
    pink: '#9C27B0',
    gray: '#888888',
    other: '#673AB7'
  }

  colors = ['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2196F3', '#3F51B5', '#673AB7', '#E91E63',
  '#9C27B0', '#009688', '#4CAF50', '#FF9800', '#795548', '#FF5722', '#2ecc71', '#27ae60', '#e67e22',
  '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e',
  '#2c3e50', '#95a5a6', '#7f8c8d', '#ec87bf', '#d870ad', '#f69785', '#9ba37e', '#b49255', '#b49255',
  '#a94136',
];

  constructor() { }

  ngOnInit() {



    
  }

  get backgroundcolour() {
    var colorIndex = 0;

    return this.c[this.color];
    

  }


}
