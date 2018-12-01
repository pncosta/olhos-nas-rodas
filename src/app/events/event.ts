import { Bicycle } from '../bicycle';
import { City, District } from '../districts/district';
import * as firebase from 'firebase/app';

export class Event {
    id?: string;
    description?: string;
    dateCreation?: Date;
    date?: Date;
    hour?: number;
    district?: District;
    city?: City;
    location?: string;
    bicycle?: Bicycle;
    coordinates?: firebase.firestore.GeoPoint;
    author?: string;
    lockerType: string;
    views: number;
    comments: Comment[];

    /** 
     * Checks if a given Event contains the given 'value' in any of its major properties
     * If ´value' has multiple words, checks if it contains all of them ( && ) 
     * words with 2 or less chars are ignored
     * 
     */ 
    public static contains (e: Event, value: string): Boolean {
      var values: string[] = value && value.length > 2 ? value.split(' ') : [];
      var containsAllValues = true;
      var i = 0;
      while (containsAllValues && i < values.length) {
        values[i] = values[i].toLowerCase();
          containsAllValues = values[i].length > 2 
                             ? e.description.toLowerCase().includes(values[i]) 
                              || e.location.toLowerCase().includes(values[i])
                              || (e.district && e.district.name && e.district.name.toLowerCase().includes(values[i]))
                              || (e.city && e.city.name && e.city.name.toLowerCase().includes(values[i]))
                              || e.bicycle 
                                && (e.bicycle.brand.toLowerCase().includes(values[i])
                                || e.bicycle.description.toLowerCase().includes(values[i]))
                             : true;
          i++;
      }
      return containsAllValues;
    }
  } 
