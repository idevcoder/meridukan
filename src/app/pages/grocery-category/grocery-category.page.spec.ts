import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryCategoryPage } from './grocery-category.page';

describe('GroceryCategoryPage', () => {
  let component: GroceryCategoryPage;
  let fixture: ComponentFixture<GroceryCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
