import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component'
import { SignupComponent } from '../app/components/signup/signup.component';
import { LandingComponent } from '../app/components/landing/landing.component'
import { ViewjobsComponent } from './components/viewjobs/viewjobs.component';
import { ViewJppliedJobsComponent } from './components/view-jpplied-jobs/view-jpplied-jobs.component';
import { GuardGuard } from './guards/guard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full"},
  // { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'landing', component: LandingComponent, canActivate: [GuardGuard] },
  { path: 'viewjobs', component: ViewjobsComponent },
  { path: 'appliedjobs', component: ViewJppliedJobsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
