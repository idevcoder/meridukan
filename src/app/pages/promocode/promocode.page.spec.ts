import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodePage } from './promocode.page';

describe('PromocodePage', () => {
  let component: PromocodePage;
  let fixture: ComponentFixture<PromocodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
