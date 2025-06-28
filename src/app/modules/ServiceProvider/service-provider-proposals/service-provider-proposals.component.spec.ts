import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderProposalsComponent } from './service-provider-proposals.component';

describe('ServiceProviderProposalsComponent', () => {
  let component: ServiceProviderProposalsComponent;
  let fixture: ComponentFixture<ServiceProviderProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderProposalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
