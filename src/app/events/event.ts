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
    views: number;
    comments: Comment[];

    /** 
     * Checks if the current Event contains the given 'value' in any of its major properties
     * If ´value' has multiple words, checks if it contains all of them ( && ) 
     * 
     */ 
    public static contains (e: Event, value: string): Boolean {
      console.log ('checking..  ');
      var values: string[] = value && value.length > 2 ? value.split(' ') : [];
      var containsAllValues = true;
      var i = 0;
      while (containsAllValues && i < values.length) {
          containsAllValues = e.description.includes(values[i]) 
                            || e.location.includes(values[i])
                            || e.bicycle 
                              && (e.bicycle.brand.includes(values[i])
                              || e.bicycle.description.includes(values[i]))
          i++;

      }

      return containsAllValues;


    }


  }
