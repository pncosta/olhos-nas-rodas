import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrePickerComponent } from './genre-picker.component';

describe('GenrePickerComponent', () => {
  let component: GenrePickerComponent;
  let fixture: ComponentFixture<GenrePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenrePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
