import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firestore, WhereFilterOp } from 'firebase/firestore';
import { EmailService } from '../core/email.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { MessageService } from '../core/message.service';
import { Conversation, Message } from './conversation';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private db: AngularFirestore,
    private email: EmailService) { }

  addConversation(c: Conversation): Promise<firebase.firestore.DocumentReference> {
    const conversations = this.db.collection<Conversation>('conversations');
    return conversations.add(JSON.parse(JSON.stringify(c))) // XXX - hack: https://github.com/angular/angularfire2/issues/1215#issuecomment-334577913
    
  }

  updateConversation(c: Conversation): Promise<any> {
    const itemDoc = this.db.doc<Conversation>('conversations/' + c.id);
    return itemDoc.update(c);
  }

}
