import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.html',
    styleUrls: ['login-dialog.component.scss']
})

export class LoginDialog implements OnInit {

    constructor(private router: Router,
        public dialogRef: MatDialogRef<LoginDialog>) { }

    recoverPassword: boolean;

    ngOnInit() {
        this.recoverPassword = false;
    }

    switchMode() {
        this.recoverPassword = !this.recoverPassword;
    }

    onLoggedIn() {
        this.dialogRef.close();
        this.router.navigate(['dashboard']);
    }
}