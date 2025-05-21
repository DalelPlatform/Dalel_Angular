import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfilePageComponent } from './complete-profile-page.component';

describe('CompleteProfilePageComponent', () => {
  let component: CompleteProfilePageComponent;
  let fixture: ComponentFixture<CompleteProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteProfilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
