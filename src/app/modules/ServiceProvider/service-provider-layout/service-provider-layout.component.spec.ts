import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderLayoutComponent } from './service-provider-layout.component';

describe('ServiceProviderLayoutComponent', () => {
  let component: ServiceProviderLayoutComponent;
  let fixture: ComponentFixture<ServiceProviderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
