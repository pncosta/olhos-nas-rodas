import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User, AuthService } from '../../core/auth.service'
import { EmailService } from '../../core/email.service';
@Component({
  selector: 'app-contactus-form',
  templateUrl: './contactus-form.component.html',
  styleUrls: ['./contactus-form.component.scss']
})
export class ContactusFormComponent implements OnInit {
  messageForm: FormGroup;
  messageStatus;

  constructor(private emailService: EmailService,
    public authService: AuthService,
    private formBuilder: FormBuilder) {
      this.messageStatus = 0;
    // Create a form
    this.messageForm = this.formBuilder.group({
      name: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]], 
      message: ['', [Validators.required, Validators.minLength(3)]], 
      subject: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit () {
    const name = this.name.value;
    const email = this.email.value;
    const subject = this.subject.value;
    const message = this.message.value;

    this.emailService.sendContactUsEmail(name, email, subject, message).subscribe(
      r => {
        console.log (r);
        if (r[0].statusCode >= 200 && r[0].statusCode < 300) { // Request was OK
          this.messageStatus = 1;
        }
        else {
          this.messageStatus = -1;
        }
      }
    )

  }

  get name() { return this.messageForm.get('name'); }
  get email() { return this.messageForm.get('email'); }
  get subject() { return this.messageForm.get('subject'); }
  get message() { return this.messageForm.get('message'); }

}
