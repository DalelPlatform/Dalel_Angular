/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopPackageCartComponent } from './topPackageCart.component';

describe('TopPackageCartComponent', () => {
  let component: TopPackageCartComponent;
  let fixture: ComponentFixture<TopPackageCartComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ TopPackageCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPackageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
