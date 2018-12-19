import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramButtonComponent } from './instagram-button.component';

describe('InstagramButtonComponent', () => {
  let component: InstagramButtonComponent;
  let fixture: ComponentFixture<InstagramButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
