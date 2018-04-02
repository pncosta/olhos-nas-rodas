import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  profileForm: FormGroup;
  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
       // Second Step
       this.profileForm = this.fb.group({
        'favoriteColor': ['', [ Validators.required ] ]
      });
      
    }

  get favoriteColor() { return this.profileForm.get('favoriteColor') }
    // Step 2
    setFavoriteColor(user) {
      return this.auth.updateUser( { favoriteColor:  this.favoriteColor.value })
    }

}