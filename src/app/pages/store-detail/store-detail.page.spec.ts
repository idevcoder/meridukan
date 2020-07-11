import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailPage } from './store-detail.page';

describe('StoreDetailPage', () => {
  let component: StoreDetailPage;
  let fixture: ComponentFixture<StoreDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
