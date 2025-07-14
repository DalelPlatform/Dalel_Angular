import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProvidersComponent } from './search-providers.component';

describe('SearchProvidersComponent', () => {
  let component: SearchProvidersComponent;
  let fixture: ComponentFixture<SearchProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
