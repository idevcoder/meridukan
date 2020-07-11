import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryOrderDetailPage } from './grocery-order-detail.page';

describe('GroceryOrderDetailPage', () => {
  let component: GroceryOrderDetailPage;
  let fixture: ComponentFixture<GroceryOrderDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryOrderDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryOrderDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
