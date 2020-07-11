import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReviewPage } from './item-review.page';

describe('ItemReviewPage', () => {
  let component: ItemReviewPage;
  let fixture: ComponentFixture<ItemReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemReviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
