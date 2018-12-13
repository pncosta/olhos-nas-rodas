import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../core/auth.service' 
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  loginForm: FormGroup;
  resetStatus: number;

  ngOnInit() {
    this.resetStatus = 0;
      this.loginForm = this.fb.group({
          'email': ['', [
              Validators.required,
              Validators.email
          ]
        ],
      });
  }

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  goBack() {
    this.resetStatus = 0;
  }
  
  resetPassword () {
    this.auth.resetPassword(this.email.value)
    .then(r => this.resetStatus = 1)
    .catch(err => this.resetStatus = -1)
  }

  get email() { return this.loginForm.get('email'); }
}
