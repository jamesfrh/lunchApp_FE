import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/shared/session.service';
import { RestaurantService } from 'src/shared/restaurant.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionDetail } from 'src/models/session-details.model';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  sessionCode: number | null = null;
  isSessionCodeInvalid: boolean = false;
  isSessionActive: boolean = false;
  username: string | null = localStorage.getItem('username');
  sessionCodeErrorMessage: string = 'Invalid Session Code.';
  sessionInitiationErrorMessage: string = '';
  sessionActiveMessage: string = '';
  sessionJoinErrorMessage: string = '';
  sessionEndErrorMessage: string = '';
  sessionEndSuccessMessage: boolean = false;
  selectedRestaurant: string | null = null;
  loading: boolean = false;
  sessionDetails!: SessionDetail;

  constructor(
    private sessionService: SessionService,
    private restaurantService: RestaurantService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.checkActiveSession();
    if (this.isSessionActive) {
      console.log('printing active mssg');
      this.sessionActiveMessage =
        'You have an active session code: ' + this.sessionCode!.toString();
    }
    const storedSessionCode = localStorage.getItem('sessionCode');
    if (storedSessionCode !== null) {
      // Attempt to convert the string to a number
      const parsedSessionCode = parseInt(storedSessionCode, 10);

      // Check if the conversion was successful
      if (!isNaN(parsedSessionCode)) {
        this.sessionCode = parsedSessionCode;
      } else {
        console.error('Invalid session code in local storage');
      }
    } else {
      console.error('No session code found in local storage');
    }
    if (storedSessionCode !== null) {
      // Attempt to convert the string to a number
      const parsedSessionCode = parseInt(storedSessionCode, 10);

      // Check if the conversion was successful
      if (!isNaN(parsedSessionCode)) {
        this.sessionCode = parsedSessionCode;
      } else {
        console.error('Invalid session code in local storage');
      }
    } else {
      console.error('No session code found in local storage');
    }
  }
  getUsername(): string | null {
    // Retrieve username from localStorage
    return localStorage.getItem('username');
  }

  async initiateSession() {
    if (this.isSessionActive) {
      this.sessionInitiationErrorMessage =
        'You have an active session code: ' +
        this.sessionCode!.toString() +
        '. Please end the current session before starting a new one';
      return;
    }

    const username = this.getUsername();

    if (username) {
      this.spinner.show();
      this.loading = true;

      try {
        const response: any = await this.sessionService.initiateSession(username).toPromise();

        console.log('Response from backend initiateSession:', response);

        const generatedSessionCode = response.generatedSessionCode;
        this.sessionService.setSessionCode(generatedSessionCode);

        this.router.navigate(['/restaurant-submission']);
      } catch (error) {
        console.error('Error initiating session:', error);
      } finally {
        this.spinner.hide();
        this.loading = false;
      }
    } else {
      alert('Username not found in localStorage. Please log in first.');
    }
  }
  async checkActiveSession() {
    console.log('checking if active');
    const username = this.getUsername();

    if (username) {
      try {
        const response: any = await this.sessionService.checkActiveSession(username).toPromise();

        if (response.hasActiveSession) {
          this.isSessionActive = true;
        } else {
          console.log('No active session.');
          this.isSessionActive = false;
        }
      } catch (error) {
        console.error('Error checking active session:', error);
      }
    } else {
      alert('Username not found in localStorage. Please log in first.');
    }
  }
  async joinSession() {
    localStorage.setItem("sessionCode", this.sessionCode!.toString()) 
    this.sessionJoinErrorMessage = '';
    
    if (this.username) {
      try {
        // if (this.isSessionActive === false) {
          const response: any = await this.sessionService.joinSession(this.username, this.sessionCode!).toPromise();
  
          console.log('Response from backend joinSession:', response);
  
          if (response && response.message === 'Successfully joined the session') {
            localStorage.setItem('sessionCode', this.sessionCode!.toString());
            this.router.navigate(['/restaurant-submission']);
          } else {
            console.error('Invalid session code or unable to join the session.');
            this.sessionJoinErrorMessage = 'Invalid session code or unable to join the session.';
          }
        // } else {
        //   console.log('in else');
        //   const response: any = await this.sessionService.checkActiveSessionWithSessionCode(
        //     this.username,
        //     this.sessionCode.toString()
        //   ).toPromise();
  
        //   console.log('active session same user', response);
  
        //   if (response && response.message === 'Active session found.') {
        //     console.log('Active session.');
        //     this.router.navigate(['/restaurant-submission']);
        //   } else {
        //     console.log('Inactive session.');
        //     this.sessionJoinErrorMessage = 'Failed to join session. Check session code and try again.';
        //   }
        // }
      } catch (error) {
        console.error('Error joining session:', error);
        this.sessionJoinErrorMessage = 'Failed to join session. Check session code and try again.';
      }
    } else {
      this.sessionJoinErrorMessage = 'Username not found. Please log in first.';
    }
  }
  
  async endSession() {
    this.sessionEndSuccessMessage = false;
    this.sessionEndErrorMessage = '';
  
    const username = this.getUsername();
    const sessionCode = this.sessionCode;
  
    if (username && sessionCode) {
      try {
        const response: any = await this.sessionService.endSession(username, sessionCode).toPromise();
  
        if (response && response.message === 'Successfully ended the session.') {
          this.sessionEndSuccessMessage = true;
          this.isSessionActive = false;
          this.selectedRestaurant = response.selectedRestaurant;
          this.sessionCode = response.sessionCode;
          localStorage.removeItem('sessionCode');
        } else {
          console.error('Error ending session:', response.error);
          this.sessionEndErrorMessage = 'Failed to end session. Check session code and try again.';
        }
      } catch (error) {
        console.error('Error ending session:', error);
        this.sessionEndErrorMessage = 'Unable to end session';
      }
    } else {
      this.sessionEndErrorMessage = 'Username or session code not found. Please log in and provide a session code.';
    }
  }
}
