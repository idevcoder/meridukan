import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFriendsPage } from './invite-friends.page';

describe('InviteFriendsPage', () => {
  let component: InviteFriendsPage;
  let fixture: ComponentFixture<InviteFriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteFriendsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
