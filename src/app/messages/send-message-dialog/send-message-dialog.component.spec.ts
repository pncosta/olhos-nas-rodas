import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageDialogComponent } from './send-message-dialog.component';

describe('SendMessageDialogComponent', () => {
  let component: SendMessageDialogComponent;
  let fixture: ComponentFixture<SendMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
