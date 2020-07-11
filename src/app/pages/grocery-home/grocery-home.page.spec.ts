import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryHomePage } from './grocery-home.page';

describe('GroceryHomePage', () => {
  let component: GroceryHomePage;
  let fixture: ComponentFixture<GroceryHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
