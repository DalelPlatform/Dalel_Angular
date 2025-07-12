import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsComponentComponent } from './request-details-component.component';

describe('RequestDetailsComponentComponent', () => {
  let component: RequestDetailsComponentComponent;
  let fixture: ComponentFixture<RequestDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
