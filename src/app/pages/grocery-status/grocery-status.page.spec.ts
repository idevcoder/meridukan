import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryStatusPage } from './grocery-status.page';

describe('GroceryStatusPage', () => {
  let component: GroceryStatusPage;
  let fixture: ComponentFixture<GroceryStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
