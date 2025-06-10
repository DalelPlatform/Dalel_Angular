import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllRestaurantComponent } from './get-all-restaurant.component';

describe('GetAllRestaurantComponent', () => {
  let component: GetAllRestaurantComponent;
  let fixture: ComponentFixture<GetAllRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
