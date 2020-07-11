import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterPage } from './product-filter.page';

describe('ProductFilterPage', () => {
  let component: ProductFilterPage;
  let fixture: ComponentFixture<ProductFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
