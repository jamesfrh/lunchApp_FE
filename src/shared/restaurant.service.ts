import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Restaurant } from 'src/models/restauraunt.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private submittedRestaurantsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private baseUrl = 'http://localhost:8080/api/restaurants';

  constructor(private router: Router, private http: HttpClient) { 
    
  }

  submitRestaurant(username: string, sessionCode: string,restaurantName: string): Observable<any> {
    const requestBody = {username, sessionCode, restaurantName};
    return this.http.post(`${this.baseUrl}/submit`, requestBody);
}


  getSubmittedRestaurantList(sessionCode: string): Observable<any>{
    return this.http.get<Restaurant[]>(`${this.baseUrl}/submitted-restaurants/${sessionCode}`);

  }

}
