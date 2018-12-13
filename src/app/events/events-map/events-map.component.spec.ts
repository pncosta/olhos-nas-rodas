import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMapComponent } from './events-map.component';

describe('EventsMapComponent', () => {
  let component: EventsMapComponent;
  let fixture: ComponentFixture<EventsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
