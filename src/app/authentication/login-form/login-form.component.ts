import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { AuthService } from '../../core/auth.service';
import { Router } from "@angular/router";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  wrongPasswordError: boolean;
  @Output() onLoggedIn = new EventEmitter<any>();

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.wrongPasswordError = false;
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        // Validators.maxLength(25),
        Validators.required
      ]
      ],
      'region': ['', [
      ]
      ],
    });
  }

  login() {
    this.auth.emailLogin(this.email.value, this.password.value)
      .then (res => this.loginSucessful(res))
      .catch(err => this.wrongPasswordError = true);
  }

  loginSucessful (e) {
    this.onLoggedIn.emit(e);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


}
