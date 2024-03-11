import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionCodeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private baseUrl = 'http://localhost:8080/api/sessions';

  constructor(private router: Router, private http: HttpClient) {}

  initiateSession(username: string): Observable<any>  {
    return this.http.post(`${this.baseUrl}/initiate/${username}`, {});
    }
  

  joinSession(username: string, sessionCode: number): Observable<any> {
    console.log("in session service join session")

    return this.http.post(`${this.baseUrl}/join-session/${username}/${sessionCode}`,{});
  
}
  getSessionCode(): string | null {
    return this.sessionCodeSubject.value;
  }

  setSessionCode(sessionCode: string): void {
    // Set the session code in localStorage
    localStorage.setItem('sessionCode', sessionCode);

    // Update the session code subject
    this.sessionCodeSubject.next(sessionCode);
  }

  checkActiveSession(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/check-active/${username}`);
  }
  checkActiveSessionWithSessionCode(username: string, sessionCode: string):Observable<any>{
    return this.http.get(`${this.baseUrl}/check-active-session/${username}/${sessionCode}`);

  }
  getRandomSessionCode(): string | null {
    return this.sessionCodeSubject.value;
  }
  generateRandomSessionCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  endSession(username: string, sessionCode: number): Observable<any> {
    const requestBody = { username, sessionCode };
    return this.http.post(`${this.baseUrl}/end-session`, requestBody);
  }
  getSessionDetails(sessionCode: number) :Observable<any>{
    return this.http.get(`${this.baseUrl}/session/${sessionCode}`);
  }


  
}
