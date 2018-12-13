import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleImagePlaceholderComponent } from './bicycle-image-placeholder.component';

describe('BicycleImagePlaceholderComponent', () => {
  let component: BicycleImagePlaceholderComponent;
  let fixture: ComponentFixture<BicycleImagePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicycleImagePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicycleImagePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
