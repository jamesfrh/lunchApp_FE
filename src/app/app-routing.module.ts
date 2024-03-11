import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SessionComponent } from '../session/session/session.component';
import { RestaurantSubmissionComponent } from '../restaurant/restaurant-submission/restaurant-submission.component';
import { LoginComponent } from '../login/login.component'; 
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'session', component: SessionComponent, canActivate: [AuthGuard] },
  { path: 'restaurant-submission', component: RestaurantSubmissionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
