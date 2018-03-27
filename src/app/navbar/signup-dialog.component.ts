import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";

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

  constructor(public fb: FormBuilder, public auth: AuthService, private router: Router,
    public dialogRef: MatDialogRef<SignupDialog>) { }

  ngOnInit() {

    // First Step
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        //   Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        // Validators.minLength(6),
        // Validators.maxLength(25),
        Validators.required
      ]
      ],
      'region': ['', [
      ]
      ],
    });




  }
  // Step 1
  signup() {
    return this.auth.signup(this.email.value, this.password.value)
  }

  private afterSignedUp(e) {
    this.dialogRef.close();
    this.router.navigate(['dashboard'])
  }

  // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }


  /* emailFormControl = new FormControl('', [
     Validators.required,
     Validators.email,
   ]);
 
   matcher = new MyErrorStateMatcher();*/

}
