import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerLayoutComponent } from './property-owner-layout.component';

describe('PropertyOwnerLayoutComponent', () => {
  let component: PropertyOwnerLayoutComponent;
  let fixture: ComponentFixture<PropertyOwnerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyOwnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
