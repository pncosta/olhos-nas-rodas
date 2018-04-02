import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { PasswordValidation } from './password-validation';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'signup-dialog',
  templateUrl: './signup-dialog.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialog implements OnInit {

  signupForm: FormGroup;
  error: String;

  constructor(public fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<SignupDialog>) { }

  ngOnInit() {

    const usernameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    const emailControl = new FormControl('', [Validators.required, Validators.email]);
    const passwordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]);
    const confirmPasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]);

    this.signupForm = this.fb.group({
      'username': usernameControl,
      'email': emailControl,
      'password': passwordControl,
      'confirmPassword': confirmPasswordControl,
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }


  signup() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      this.auth.signup(this.email.value, this.password.value)
        .then((res) => { this.afterSignedUp(res); })
        .catch((err) => { this.handleError(err) } );
    }
  }

  private afterSignedUp(e) {
    this.dialogRef.close();
    this.router.navigate(['dashboard'])
  }

  private handleError(err) {
    this.error = err.code;;
  }

  // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get confirmPassword() { return this.signupForm.get('confirmPassword') }

}
