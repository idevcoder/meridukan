import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpmodalpagePage } from './otpmodalpage.page';

describe('OtpmodalpagePage', () => {
  let component: OtpmodalpagePage;
  let fixture: ComponentFixture<OtpmodalpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpmodalpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpmodalpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
