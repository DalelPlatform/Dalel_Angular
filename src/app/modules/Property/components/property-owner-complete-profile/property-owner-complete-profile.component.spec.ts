import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerCompleteProfileComponent } from './property-owner-complete-profile.component';

describe('PropertyOwnerCompleteProfileComponent', () => {
  let component: PropertyOwnerCompleteProfileComponent;
  let fixture: ComponentFixture<PropertyOwnerCompleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerCompleteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyOwnerCompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
