import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class HttpInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true' 
      }
    });
    return next.handle(modifiedRequest);
  }
}
