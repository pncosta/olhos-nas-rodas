import { Component, OnInit, Inject,  } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { EmailService } from '../../core/email.service';
import { Event } from '../../events/event'
import { User, AuthService } from '../../core/auth.service'

export interface DialogData {
  event: Event,
  author: User;
  
}

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss']
})

export class SendMessageDialogComponent implements OnInit {

  messageForm : FormGroup;
 

  
  constructor(public dialogRef: MatDialogRef<SendMessageDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data: DialogData,
            private emailService: EmailService,
            private authService: AuthService,
            private formBuilder: FormBuilder) {
    
     // Create a form
      this.messageForm = this.formBuilder.group({
        message: ['', [Validators.required, Validators.minLength(3)]]
      });
     }

  onNoClick(): void {
    this.dialogRef.close('no');
  }

  onYesClick(): void {
    this.emailService.sendEmailToUser(
      this.data.author.email,
      this.data.author.displayName,
      this.authService.UserDetails.email,
      this.authService.UserDetails.displayName,
      this.message.value
    ).subscribe(r =>  {
      console.log({r});
      this.dialogRef.close('sent')
    } );
   
  }

  get message() {
    return this.messageForm.get('message');
  } 


  ngOnInit() {
  }

}
