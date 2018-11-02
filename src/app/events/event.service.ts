import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firestore } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../core/message.service';
import { Event } from './event';
import * as firebase from 'firebase/app';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EventService {
  private eventsURL = 'api/events';  // URL to web api
  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private messageService: MessageService) { }

  getEvents(): Observable<Event[]> {
    return this.db.collection<Event>('/events').snapshotChanges().map(events => {
      return events.map(a => {
        return { id: a.payload.doc.id, ...a.payload.doc.data() } as Event;
      });
    });
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: string): Observable<Event> {

    const itemDoc = this.db.doc<Event>('events/' + id);
    return itemDoc.snapshotChanges().map(e => {
      return { id: e.payload.id, ...e.payload.data() } as Event;
    });
  }

  incrementViewCounter(id: string) {
    const s = this.getEvent(id).subscribe(e => {
      e.views++;
      this.updateEvent(e);
      s.unsubscribe();
    });
  }


  updateEvent(event: Event) {
    const itemDoc = this.db.doc<Event>('events/' + event.id);
    itemDoc.update(event)
      .then(e => console.dir(e))
      .catch(err => console.dir(err));
  }

  addEvent(event: Event): Promise<firebase.firestore.DocumentReference> {
    const events = this.db.collection<Event>('events');
    return events.add(event);
  }

  /** DELETE: delete the hero from the server */
  deleteEvent(event: Event | number): Observable<Event> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.eventsURL}/${id}`;

    return this.http.delete<Event>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted event id=${id}`)),
      catchError(this.handleError<Event>('deleteEvent'))
    );
  }

  /** Log a EventService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
