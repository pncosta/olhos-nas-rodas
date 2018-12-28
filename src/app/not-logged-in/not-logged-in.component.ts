import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginDialog } from '../navbar/login-dialog.component';
import { SignupDialogComponent } from '../navbar/signup-dialog.component';
@Component({
  selector: 'app-not-logged-in',
  templateUrl: './not-logged-in.component.html',
  styleUrls: ['./not-logged-in.component.css']
})
export class NotLoggedInComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginDialog() {
    const dialog = this.openDialog(LoginDialog);
    /* dialog.afterClosed().subscribe(result => { }); */
  }

  openSignupDialog() {
    const dialog = this.openDialog(SignupDialogComponent);
  }

  openDialog(d) {
    return this.dialog.open(d, {
      width: '500px',
      maxWidth: '90%'
    });
  }
}
