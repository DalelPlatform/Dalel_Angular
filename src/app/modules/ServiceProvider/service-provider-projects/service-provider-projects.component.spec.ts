import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderProjectsComponent } from './service-provider-projects.component';

describe('ServiceProviderProjectsComponent', () => {
  let component: ServiceProviderProjectsComponent;
  let fixture: ComponentFixture<ServiceProviderProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
