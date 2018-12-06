import { User } from '../core/auth.service'



import * as firebase from 'firebase/app';

export class Conversation {
    id?: string;
    users: User[];
    messages: Message[];
    status: Status;

    constructor() {
        this.messages = [];
        this.users = [];
        this.status = Status.NEW;
     }

     addUser(u: User) {
         if (this.users == undefined) 
            this.users = [];
        this.users.push(u);
     }

     addMessage(m: Message) {
        if (this.messages == undefined) 
           this.messages = [];
       this.messages.push(m);
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }

}

export class Message {
    id?: string;
    message: string;
    from: User;
    to: User[];
    date: Date;
    status: Status;
    
    constructor(from: User, to: User[]) {
        this.from = from;
        this.to = to;
        this.date = new Date();
        this.status = Status.NEW;
    }

    setMessage (m: string) {
        this.message = m;
    }
}

export enum Status {
    NEW,
    SEEN,
    DELETED
}