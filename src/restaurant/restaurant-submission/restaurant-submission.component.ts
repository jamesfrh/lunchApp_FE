import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/models/restauraunt.model';
import { RestaurantService } from 'src/shared/restaurant.service';
import { SessionService } from 'src/shared/session.service';

@Component({
  selector: 'app-restaurant-submission',
  templateUrl: './restaurant-submission.component.html',
  styleUrls: ['./restaurant-submission.component.css']
})
export class RestaurantSubmissionComponent implements OnInit,OnDestroy {
  restaurantName: string = '';
  submittedRestaurants: Restaurant[] = [];
  submittedRestaurantsSubscription!: Subscription;
  submitSuccessMessage: boolean = false;
  submitErrorMessage: string = '';

  username: string | null = localStorage.getItem('username');
  sessionCode: string | null = localStorage.getItem('sessionCode');

  constructor(
    private restaurantService: RestaurantService,
    private sessionService: SessionService

  ){
    this.submittedRestaurantsSubscription = new Subscription();

  }
  ngOnInit(): void {
    const sessionCode = localStorage.getItem('sessionCode');
    if(sessionCode){
      console.log("in session")
      this.submittedRestaurantsSubscription = this.restaurantService.getSubmittedRestaurantList(sessionCode)
      .subscribe((restaurants: Restaurant[]) => {
        this.submittedRestaurants = restaurants;
        console.log("in session" + this.submittedRestaurants)

      })
    }
  }
  ngOnDestroy() {
    // Unsubscribe from the submitted restaurants subscription to avoid memory leaks
    this.submittedRestaurantsSubscription.unsubscribe();
  }

  submitRestaurant() {
    const username = this.getUsername();
    const sessionCode = localStorage.getItem("sessionCode");
    console.log("username" + username)
    console.log("sessionCode" + sessionCode)

    if (username && sessionCode) {
      this.restaurantService.submitRestaurant(username, sessionCode, this.restaurantName).subscribe(
        (response: any) => {
          console.log('Response from backend submitRestaurant:', response);
          this.submitSuccessMessage =true;
          this.submitErrorMessage = '';
          this.restaurantService.getSubmittedRestaurantList(sessionCode).subscribe(
            (restaurants: Restaurant[]) => {
              this.submittedRestaurants = restaurants;
            },
            (error: any) => {
              this.submitErrorMessage = 'Failed to fetch updated restaurant list'
              this.submitSuccessMessage = false;
              console.error('Error fetching updated restaurant list:', error);
            }
          );
        },
        (error: any) => {
          this.submitErrorMessage = 'Error submitting restaurant:' + error;
          this.submitSuccessMessage = false;

          if (error.status === 409) {
            // Conflict: Restaurant with the same name already exists in this session
            this.submitErrorMessage = 'Restaurant with the same name already exists in this session.';
            this.submitSuccessMessage = false;

          } else {
            this.submitSuccessMessage = false;
            this.submitErrorMessage = 'Failed to submit restaurant. Check session status and try again.';
          }
        }
      );
    }
  }
  

  getUsername(): string | null {
    // Retrieve username from localStorage
    return localStorage.getItem('username');
  }
}
