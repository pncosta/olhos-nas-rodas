import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent }      from './events/events.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { EventDetailComponent }  from './event-detail/event-detail.component';
import { SignupComponent }  from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}