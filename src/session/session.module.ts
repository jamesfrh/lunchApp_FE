import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionComponent } from './session/session.component';
import { SearchSessionComponent } from './search-session/search-session.component';



@NgModule({
  declarations: [
    SessionComponent,
    SearchSessionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SessionModule { }
