import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantSubmissionComponent } from './restaurant-submission/restaurant-submission.component';
import { SubmittedRestaurantsComponent } from './submitted-restaurants/submitted-restaurants.component';
import { PickedRestaurantComponent } from './picked-restaurant/picked-restaurant.component';



@NgModule({
  declarations: [
    RestaurantSubmissionComponent,
    SubmittedRestaurantsComponent,
    PickedRestaurantComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RestaurantModule { }
