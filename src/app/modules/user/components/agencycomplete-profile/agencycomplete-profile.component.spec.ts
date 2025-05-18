import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencycompleteProfileComponent } from './agencycomplete-profile.component';

describe('AgencycompleteProfileComponent', () => {
  let component: AgencycompleteProfileComponent;
  let fixture: ComponentFixture<AgencycompleteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencycompleteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencycompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
