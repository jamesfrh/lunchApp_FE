import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SessionComponent } from 'src/session/session/session.component';
import { RestaurantSubmissionComponent } from 'src/restaurant/restaurant-submission/restaurant-submission.component';

import { SessionService } from '../shared/session.service';
import { LoginComponent } from 'src/login/login.component';
import { HttpInterceptorService } from 'src/shared/http/http-interceptor';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    RestaurantSubmissionComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [SessionService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
