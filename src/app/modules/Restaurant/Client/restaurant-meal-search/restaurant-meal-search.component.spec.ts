import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMealSearchComponent } from './restaurant-meal-search.component';

describe('RestaurantMealSearchComponent', () => {
  let component: RestaurantMealSearchComponent;
  let fixture: ComponentFixture<RestaurantMealSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMealSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantMealSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
