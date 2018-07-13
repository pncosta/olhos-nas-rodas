import { Bicycle } from '../bicycle';
import * as firebase from 'firebase/app';

export class Event {
    id?: string;
    title?: string;
    description?: string;
    dateCreation?: Date;
    date?: Date;
    location?: string;
    bicycle?: Bicycle;
    coordinates?: firebase.firestore.GeoPoint;
    author?: string;
  }
