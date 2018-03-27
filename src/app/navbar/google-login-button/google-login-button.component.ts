import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.css']
})
export class GoogleLoginButtonComponent implements OnInit {
  @Output() onLoggedIn = new EventEmitter<any>();
  constructor(public auth: AuthService ) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then((res) => {
        this.onLoggedIn.emit(res);
      })
      .catch((err) => this.onLoggedIn.emit(err));
  }

}
