import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalDonationButtonComponent } from './paypal-donation-button.component';

describe('PaypalDonationButtonComponent', () => {
  let component: PaypalDonationButtonComponent;
  let fixture: ComponentFixture<PaypalDonationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalDonationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalDonationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
