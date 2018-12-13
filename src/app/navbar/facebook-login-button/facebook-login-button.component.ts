import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-facebook-login-button',
  templateUrl: './facebook-login-button.component.html',
  styleUrls: ['./facebook-login-button.component.scss']
})
export class FacebookLoginButtonComponent implements OnInit {
  @Output() onLoggedIn = new EventEmitter<any>();
  constructor(public auth: AuthService ) { }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.auth.signInWithFacebook()
      .then(res => this.onLoggedIn.emit(res))
      .catch(err => console.error(err));
  }
}
