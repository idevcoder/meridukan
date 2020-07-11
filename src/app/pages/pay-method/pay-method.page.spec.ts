import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMethodPage } from './pay-method.page';

describe('PayMethodPage', () => {
  let component: PayMethodPage;
  let fixture: ComponentFixture<PayMethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayMethodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
