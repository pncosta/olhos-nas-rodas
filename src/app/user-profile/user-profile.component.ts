import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../navbar/password-validation';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  profileForm: FormGroup;
  passwordForm: FormGroup;
  passwordChangeStatus: number;
  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.passwordChangeStatus = 0;
    const passwordControl = PasswordValidation.getPasswordControl();
    const confirmPasswordControl = PasswordValidation.getPasswordControl();

    this.passwordForm = this.fb.group({
      'password': passwordControl,
      'confirmPassword': confirmPasswordControl,
    }, {
        validator: PasswordValidation.MatchPassword
      });
      this.profileForm = this.fb.group({
        'avatar' : new FormControl('', [])
      });
    }

    // Step 2
    updateProfile() {
      return this.auth.updateUser( { photoURL:  this.avatar.value })
    }

        // Step 2
    updatePassword() {
      return this.auth.updatePassword(this.password.value)
      .then (r => this.passwordChangeStatus = 1)
      .catch (e => this.passwordChangeStatus = -1) ;
    }

    get avatar() { return this.profileForm.get('avatar') }
    get password() { return this.passwordForm.get('password') }
    get confirmPassword() { return this.passwordForm.get('confirmPassword') }

}