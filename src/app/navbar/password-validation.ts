import { AbstractControl } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }

    static getPasswordControl() {
        return new FormControl('', [Validators.required, Validators.minLength(8), 
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]);
    }

    static getUsernameControl() {
        return new FormControl('', [Validators.required, Validators.minLength(3)]);
    }

    static getEmailControl() {
        return new FormControl('', [Validators.required, Validators.email]);
    }
   
}