import { Bicycle } from '../bicycle';
import * as firebase from 'firebase/app';

export class Event {
    id?: string;
    description?: string;
    dateCreation?: Date;
    date?: Date;
    hour?: number;
    location?: string;
    bicycle?: Bicycle;
    coordinates?: firebase.firestore.GeoPoint;
    author?: string;
    lockerType: string;
  }
