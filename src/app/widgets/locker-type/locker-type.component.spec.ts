import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerTypeComponent } from './locker-type.component';

describe('LockerTypeComponent', () => {
  let component: LockerTypeComponent;
  let fixture: ComponentFixture<LockerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
