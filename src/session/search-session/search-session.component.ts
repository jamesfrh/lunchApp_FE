import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/models/restauraunt.model';
import { SessionDetail } from 'src/models/session-details.model';
import { SessionService } from 'src/shared/session.service';

@Component({
  selector: 'app-search-session',
  templateUrl: './search-session.component.html',
  styleUrls: ['./search-session.component.css']
})
export class SearchSessionComponent implements OnInit {

  sessionCode: number | undefined;
  sessionDetails: SessionDetail | undefined;
  sessionRestaurantSubmission: Restaurant[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}
  async searchSession() {
    try {
      const response: any = await this.sessionService.getSessionDetails(this.sessionCode!).toPromise();
      
      if (response.sessionDetails) {
        this.sessionDetails = response.sessionDetails.sessionDetails;
        this.sessionRestaurantSubmission = response.sessionDetails.restaurantList;

        console.log('Session details:');
        console.log(this.sessionDetails);
        console.log('restaurantList:');
        console.log(this.sessionRestaurantSubmission);

      } else {
        console.log('No session found for the provided session code.');
      }
    } catch (error) {
      console.error('Error getting session details:', error);
    }
  }
}
