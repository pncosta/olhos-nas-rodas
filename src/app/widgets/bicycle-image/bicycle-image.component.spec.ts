import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleImageComponent } from './bicycle-image.component';

describe('BicycleImageComponent', () => {
  let component: BicycleImageComponent;
  let fixture: ComponentFixture<BicycleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicycleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicycleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
