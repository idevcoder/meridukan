import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryCartPage } from './grocery-cart.page';

describe('GroceryCartPage', () => {
  let component: GroceryCartPage;
  let fixture: ComponentFixture<GroceryCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
