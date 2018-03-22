import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent }      from './events/events.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { EventDetailComponent }  from './event-detail/event-detail.component';
import { AuthGuard }  from './core/auth.guard';
import { UserProfileComponent }  from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'events/:id', component: EventDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}