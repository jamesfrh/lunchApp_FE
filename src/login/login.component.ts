import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit():void{
    localStorage.clear();


  }
  login(): void {
    this.authService.login(this.username).subscribe({
      next: response => {
        console.log(response.message); // Access the 'message' property
        if (response.message === 'Login successful') {
          localStorage.setItem('username', this.username);
          this.router.navigate(['/session']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      error: error => {
        console.error('Login error:', error);
        this.errorMessage = 'An error occurred during login';
      }
    });
    
  }
  
}
