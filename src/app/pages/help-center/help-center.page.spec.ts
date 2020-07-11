import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterPage } from './help-center.page';

describe('HelpCenterPage', () => {
  let component: HelpCenterPage;
  let fixture: ComponentFixture<HelpCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
