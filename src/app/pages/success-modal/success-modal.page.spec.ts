import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalPage } from './success-modal.page';

describe('SuccessModalPage', () => {
  let component: SuccessModalPage;
  let fixture: ComponentFixture<SuccessModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
