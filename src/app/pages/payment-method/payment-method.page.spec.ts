import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodPage } from './payment-method.page';

describe('PaymentMethodPage', () => {
  let component: PaymentMethodPage;
  let fixture: ComponentFixture<PaymentMethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
