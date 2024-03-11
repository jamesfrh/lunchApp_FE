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
  sessionCode: number = 0;
  isSessionCodeInvalid: boolean = false;
  isSessionActive: boolean = false;
  username: string | null = localStorage.getItem('username');
  sessionCodeErrorMessage: string = 'Invalid Session Code.';
  sessionInitiationErrorMessage: string = '';
  sessionActiveMessage: string = '';
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
        'You have an active session code: ' + this.sessionCode.toString();
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

  initiateSession() {
    if (this.isSessionActive) {
      this.sessionInitiationErrorMessage =
        'You have an active session code: ' +
        this.sessionCode.toString() +
        '. Please end the current session before starting a new one';
      return;
    }
    const username = this.getUsername();
    if (username) {
      this.spinner.show();
      this.loading = true;
      // Call the backend service to initiate the session and get the generated session code
      this.sessionService
        .initiateSession(username)
        .subscribe(
          (response: any) => {
            console.log('Response from backend initiateSession:', response);
            // Assuming the backend returns the generated session code
            const generatedSessionCode = response.generatedSessionCode;
            this.sessionService.setSessionCode(generatedSessionCode);

            // Update the session code in the session service
            // this.sessionService.setSessionCode(generatedSessionCode);
            this.router.navigate(['/restaurant-submission']);
          },
          (error) => {
            console.error('Error initiating session:', error);
          }
        )
        .add(() => {
          this.spinner.hide();
          this.loading = false;
        });
    } else {
      alert('Username not found in localStorage. Please log in first.');
    }
  }
  checkActiveSession() {
    console.log('checking if active');
    const username = this.getUsername();
    if (username) {
      this.sessionService.checkActiveSession(username).subscribe(
        (response: any) => {
          if (response.hasActiveSession) {
            this.isSessionActive = true;
          } else {
            console.log('No active session.');
            this.isSessionActive = false;
          }
        },
        (error) => {
          console.error('Error checking active session:', error);
        }
      );
    } else {
      alert('Username not found in localStorage. Please log in first.');
    }
  }
  searchSession() {
    this.sessionService.getSessionDetails(this.sessionCode).subscribe(
      (response: any) => {
        if (response.sessionDetails) {
          this.sessionDetails = response.sessionDetails
          console.log('Session details:');
          console.log(this.sessionDetails);
        } else {
          console.log('No session found for the provided session code.');
        }
      },
      (error) => {
        // Handle errors from the backend service
        console.error('Error getting session details:', error);
      }
    );
  }
  joinSession() {
    if (this.username) {
      if (this.isSessionActive === false) {
        this.sessionService
          .joinSession(this.username, this.sessionCode)
          .subscribe(
            (response: any) => {
              console.log('Response from backend joinSession:', response);
              if (
                response &&
                response.message === 'Successfully joined the session'
              ) {
                localStorage.setItem(
                  'sessionCode',
                  this.sessionCode.toString()
                );
                this.router.navigate(['/restaurant-submission']);
              } else {
                // Session code is invalid, handle accordingly (e.g., display an error)
                console.error(
                  'Invalid session code or unable to join the session.'
                );
                alert('Invalid session code or unable to join the session.');
              }
            },
            (error: any) => {
              console.error('Error joining session:', error);
              // Handle the error, e.g., display a message to the user
              alert(
                'Failed to join session. Check session code and try again.'
              );
            }
          );
      } else {
        this.sessionService
          .checkActiveSessionWithSessionCode(
            this.username,
            this.sessionCode.toString()
          )
          .subscribe((response: any) => {
            console.log('active session same user');

            console.log(response);
            if (response && response.message === 'Active session found.') {
              // Session is active, handle accordingly
              console.log('Active session.');
              this.router.navigate(['/restaurant-submission']);
            } else {
              // Session is not active, handle accordingly
              console.log('Inactive session.');
              alert(
                'Failed to join session. Check session code and try again.'
              );
            }
          });
      }
    } else {
      alert('Username not found. Please log in first.');
    }
  }
  endSession() {
    const username = this.getUsername();
    const sessionCode = this.sessionCode;

    if (username && sessionCode) {
      this.sessionService.endSession(username, sessionCode).subscribe(
        (response: any) => {
          if (
            response &&
            response.message === 'Successfully ended the session.'
          ) {
            // Session ended successfully
            this.isSessionActive = false;
            this.selectedRestaurant = response.selectedRestaurant;
            this.sessionCode = response.sessionCode;
            localStorage.removeItem('sessionCode');
          } else {
            console.error('Error ending session:', response.error);
            alert('Failed to end session. Check session code and try again.');
          }
        },
        (error: any) => {
          console.error('Error ending session:', error);
          alert('Unable to end session');
        }
      );
    } else {
      alert(
        'Username or session code not found. Please log in and provide a session code.'
      );
    }
  }
}
