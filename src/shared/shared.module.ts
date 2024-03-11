import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from './session.service';
import { RestaurantService } from './restaurant.service';
import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SessionService,
    RestaurantService,
    AuthenticationService,
    LoggerService
  ]
})
export class SharedModule { }
