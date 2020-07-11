import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrocerySuccessPage } from './grocery-success.page';

describe('GrocerySuccessPage', () => {
  let component: GrocerySuccessPage;
  let fixture: ComponentFixture<GrocerySuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrocerySuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrocerySuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
