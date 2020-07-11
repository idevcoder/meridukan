import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryPromocodePage } from './grocery-promocode.page';

describe('GroceryPromocodePage', () => {
  let component: GroceryPromocodePage;
  let fixture: ComponentFixture<GroceryPromocodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryPromocodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryPromocodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
