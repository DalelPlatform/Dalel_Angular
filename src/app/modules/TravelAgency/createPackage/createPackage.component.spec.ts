/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreatePackageComponent } from './createPackage.component';

describe('CreatePackageComponent', () => {
  let component: CreatePackageComponent;
  let fixture: ComponentFixture<CreatePackageComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
