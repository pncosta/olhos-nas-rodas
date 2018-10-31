import { Component, OnInit, Input } from '@angular/core';
import { User } from '../core/auth.service'

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User;
  @Input() height: number = 40;
  @Input() width: number = 40;
  @Input() fontSize: number = 10;

  colors = ['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2196F3', '#3F51B5', '#673AB7', '#E91E63',
  '#9C27B0', '#009688', '#4CAF50', '#FF9800', '#795548', '#FF5722', '#2ecc71', '#27ae60', '#e67e22',
  '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e',
  '#2c3e50', '#95a5a6', '#7f8c8d', '#ec87bf', '#d870ad', '#f69785', '#9ba37e', '#b49255', '#b49255',
  '#a94136',
  ];
  

  constructor() {  }

  ngOnInit() {
    this.fontSize = this.height / 3;
  }

  get initials () {

    if (this.user.displayName) {
      var names = this.user.displayName.split(" ");
      if (names.length >= 2) {
        return names[0].charAt(0) + names[names.length-1].charAt(0); 
      }
      return names[0].charAt(0)
    }
    else 
      return this.user.email.charAt(0);
  }

  get backgroundcolour () {
    var colorIndex = 0;
  
    for (let c of this.user.displayName){     
      colorIndex += c.charCodeAt(0);
    
    }  
    return this.colors[colorIndex % (this.colors.length)];
  }

  get color () {
    return "white";
  }

  get hasAvatar() { return this.user.photoURL != null }
}
