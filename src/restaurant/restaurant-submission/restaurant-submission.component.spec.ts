import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSubmissionComponent } from './restaurant-submission.component';

describe('RestaurantSubmissionComponent', () => {
  let component: RestaurantSubmissionComponent;
  let fixture: ComponentFixture<RestaurantSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantSubmissionComponent]
    });
    fixture = TestBed.createComponent(RestaurantSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
