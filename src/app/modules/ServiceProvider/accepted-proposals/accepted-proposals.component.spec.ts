import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedProposalsComponent } from './accepted-proposals.component';

describe('AcceptedProposalsComponent', () => {
  let component: AcceptedProposalsComponent;
  let fixture: ComponentFixture<AcceptedProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedProposalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
