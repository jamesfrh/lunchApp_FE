import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username: string): Observable<any> {
    console.log('Sending request with username:', username); // Log the received username

    return this.http.get(`${this.apiUrl}/api/login?username=${username}`);

  }
}
