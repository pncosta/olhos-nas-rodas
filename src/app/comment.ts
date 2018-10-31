
import * as firebase from 'firebase/app';

export class Comment {
    id?: string;
    text: string;
    author: string;
    date: Date;
    likes: number;
  }
