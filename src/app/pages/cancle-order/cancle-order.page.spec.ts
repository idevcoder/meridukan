import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancleOrderPage } from './cancle-order.page';

describe('CancleOrderPage', () => {
  let component: CancleOrderPage;
  let fixture: ComponentFixture<CancleOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancleOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancleOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
