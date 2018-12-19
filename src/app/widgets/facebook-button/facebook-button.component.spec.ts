import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookButtonComponent } from './facebook-button.component';

describe('FacebookButtonComponent', () => {
  let component: FacebookButtonComponent;
  let fixture: ComponentFixture<FacebookButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
