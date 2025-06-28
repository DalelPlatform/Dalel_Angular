import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderAllRequestsComponent } from './service-provider-all-requests.component';

describe('ServiceProviderAllRequestsComponent', () => {
  let component: ServiceProviderAllRequestsComponent;
  let fixture: ComponentFixture<ServiceProviderAllRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderAllRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderAllRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
