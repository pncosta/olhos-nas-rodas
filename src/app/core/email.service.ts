import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class EmailService {

  SEND_EMAIL_TO_USER_ENDPOINT     = 'https://us-central1-bike-stats-1d0a3.cloudfunctions.net/httpEmail';
  SEND_CONTACT_US_EMAIL_ENDPOINT  = 'https://us-central1-bike-stats-1d0a3.cloudfunctions.net/httpContactusEmail';

  constructor(private http: HttpClient) { }


  /**
   * Sends an email to a specific user's email
   * @param toEmail receipient email
   * @param toUsername recipient username
   * @param fromEmail sender email
   * @param fromUsername sender username
   * @param message message
   */
  sendEmailToUser(toEmail: String, toUsername: String,
    fromEmail: String, fromUsername: String,
    message: String): Observable<any> {
    const data = {
      'toEmail': toEmail,
      'toUsername': toUsername,
      'fromUsername': fromUsername,
      'fromEmail': fromEmail,
      'dateSent': new Date().toLocaleDateString(),
      'message': message
    }
    return this.http.post(this.SEND_EMAIL_TO_USER_ENDPOINT, data);
  }

  sendContactUsEmail(
    fromName: String,
    fromEmail: String,
    subject: String,
    message: String): Observable<any> {
    const data = {
    
      'fromEmail': fromEmail,
      'dateSent': new Date().toLocaleDateString(),
      'subject': subject,
      'message': message
    }
    return this.http.post(this.SEND_CONTACT_US_EMAIL_ENDPOINT, data);
  }



}
