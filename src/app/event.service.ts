import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from './events/event';
import { EVENTS } from './mock-events';
import { Observable ,  of } from 'rxjs';
import { MessageService } from './core/message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EventService {
  private eventsURL = 'api/events';  // URL to web api
  constructor(  
    private http: HttpClient,
    private messageService: MessageService) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsURL)
    .pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: number): Observable<Event> {
    const url = `${this.eventsURL}/${id}`;
    return this.http.get<Event>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Event>(`getEvent id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateEvent (event: Event): Observable<any> {
    return this.http.put(this.eventsURL, event, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${event.id}`)),
      catchError(this.handleError<any>('updatEevent'))
    );
  }

  /** POST: add a new hero to the server */
  addEvent (event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsURL, event, httpOptions).pipe(
      tap((event: Event) => this.log(`added hero w/ id=${event.id}`)),
      catchError(this.handleError<Event>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteEvent (event: Event | number): Observable<Event> {
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
  private handleError<T> (operation = 'operation', result?: T) {
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
