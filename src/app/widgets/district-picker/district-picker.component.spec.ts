import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPickerComponent } from './district-picker.component';

describe('DistrictPickerComponent', () => {
  let component: DistrictPickerComponent;
  let fixture: ComponentFixture<DistrictPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
