import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { AuthService } from '../core/auth.service';
import { Router } from "@angular/router";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.html',
    styleUrls: ['login-dialog.component.scss']
})

export class LoginDialog {

    constructor(public fb: FormBuilder, public auth: AuthService, private router: Router,
        public dialogRef: MatDialogRef<LoginDialog>) { }
    private loginForm: FormGroup;

    ngOnInit() {
        this.loginForm = this.fb.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['', [
                // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
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

    loginWithGoogle() {
        this.auth.signInWithGoogle()
            .then((res) => {
                this.router.navigate(['dashboard'])
                this.dialogRef.close();
            })
            .catch((err) => console.log(err));
    }

    // TODO: login up stuff -  move to login component
    login() {
        return this.auth.login(this.email.value, this.password.value)
            .then(
            function () {
                this.dialogRef.close();
            }.bind(this))
    }
    // Using getters will make your code look pretty
    get email() { return this.loginForm.get('email') }
    get password() { return this.loginForm.get('password') }

}