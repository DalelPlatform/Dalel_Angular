import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProposalComponent } from './add-proposal.component';

describe('AddProposalComponent', () => {
  let component: AddProposalComponent;
  let fixture: ComponentFixture<AddProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
