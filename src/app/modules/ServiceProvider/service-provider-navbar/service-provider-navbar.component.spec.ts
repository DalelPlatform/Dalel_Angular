import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderNavbarComponent } from './service-provider-navbar.component';

describe('ServiceProviderNavbarComponent', () => {
  let component: ServiceProviderNavbarComponent;
  let fixture: ComponentFixture<ServiceProviderNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
