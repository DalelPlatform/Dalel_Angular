import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileServiceProviderComponent } from './complete-profile-service-provider.component';

describe('CompleteProfileServiceProviderComponent', () => {
  let component: CompleteProfileServiceProviderComponent;
  let fixture: ComponentFixture<CompleteProfileServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteProfileServiceProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfileServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
