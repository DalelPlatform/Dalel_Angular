/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgencyOwnerLayOutComponent } from './AgencyOwnerLayOut.component';

describe('AgencyOwnerLayOutComponent', () => {
  let component: AgencyOwnerLayOutComponent;
  let fixture: ComponentFixture<AgencyOwnerLayOutComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyOwnerLayOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyOwnerLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
