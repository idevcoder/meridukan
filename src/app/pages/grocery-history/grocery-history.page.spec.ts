import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryHistoryPage } from './grocery-history.page';

describe('GroceryHistoryPage', () => {
  let component: GroceryHistoryPage;
  let fixture: ComponentFixture<GroceryHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
