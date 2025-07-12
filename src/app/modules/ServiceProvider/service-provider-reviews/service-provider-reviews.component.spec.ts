import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderReviewsComponent } from './service-provider-reviews.component';

describe('ServiceProviderReviewsComponent', () => {
  let component: ServiceProviderReviewsComponent;
  let fixture: ComponentFixture<ServiceProviderReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
