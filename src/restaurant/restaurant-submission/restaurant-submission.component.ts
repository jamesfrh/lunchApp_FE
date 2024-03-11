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

  username: string | null = localStorage.getItem('username');
  sessionCode: string | null = localStorage.getItem('sessionCode');

  constructor(
    private restaurantService: RestaurantService,
    private sessionService: SessionService

  ){
    this.submittedRestaurantsSubscription = new Subscription();

  }
  ngOnInit(): void {
    const sessionCode = this.sessionService.getSessionCode();
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
    const sessionCode = this.sessionService.getSessionCode();
  
    if (username && sessionCode) {
      this.restaurantService.submitRestaurant(username, sessionCode, this.restaurantName).subscribe(
        (response: any) => {
          console.log('Response from backend submitRestaurant:', response);
  
          this.restaurantService.getSubmittedRestaurantList(sessionCode).subscribe(
            (restaurants: Restaurant[]) => {
              this.submittedRestaurants = restaurants;
              alert('Restaurant submitted successfully.');
            },
            (error: any) => {
              console.error('Error fetching updated restaurant list:', error);
              alert('Failed to fetch updated restaurant list.');
            }
          );
        },
        (error: any) => {
          console.error('Error submitting restaurant:', error);
  
          if (error.status === 409) {
            // Conflict: Restaurant with the same name already exists in this session
            alert('Restaurant with the same name already exists in this session.');
          } else {
            // Other errors
            alert('Failed to submit restaurant. Check session status and try again.');
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
