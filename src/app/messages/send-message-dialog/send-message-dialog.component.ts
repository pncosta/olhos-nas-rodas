import { Component, OnInit, Inject, } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { EmailService } from '../../core/email.service';
import { Event } from '../../events/event'
import { User, AuthService } from '../../core/auth.service'
import { MatSnackBar } from '@angular/material';
import { Conversation, Message } from '../conversation';
import { ConversationService } from '../conversation.service';

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

  messageForm: FormGroup;
  public snackBar: MatSnackBar;



  constructor(public dialogRef: MatDialogRef<SendMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private emailService: EmailService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private conversationService: ConversationService) {

    // Create a form
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close('closed');
  }

  onYesClick(): void {
    var from: User = this.authService.UserDetails;
    var to: User = this.data.author;
    var c: Conversation = new Conversation();
    c.addUser(from);
    c.addUser(to);
    var m: Message = new Message(from, [to]);
    m.setMessage(this.message.value);
    c.addMessage(m);

    this.conversationService.addConversation(c)
      .then(r => { // TODO: Refactor and move email sending to service or function, not component
        this.emailService.sendEmailToUser(
          to.email, to.displayName,
          from.email, from.displayName,
          m.message
        ).subscribe(r => {
          if (r[0].statusCode >= 200 && r[0].statusCode < 300) { // Request was OK
            this.dialogRef.close('success')
            this.openSnackBar("Enviada com sucesso", '')
          }
          else
            this.openSnackBar("Ocurreu um erro no envio da mensagem", '')
        });
      }

      )
      .catch(err => this.openSnackBar("Ocurreu um erro no envio da mensagem", ''));
  }

  get message() {
    return this.messageForm.get('message');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
