import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr'

/* Auth service */
import { AuthenticationService } from './shared/authentication.service';
import { LandingComponent } from './components/landing/landing.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { ViewjobsComponent } from './components/viewjobs/viewjobs.component';
import { ViewJppliedJobsComponent } from './components/view-jpplied-jobs/view-jpplied-jobs.component';
import { DataService } from './shared/data.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    SidemenuComponent,
    ViewjobsComponent,
    ViewJppliedJobsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthenticationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
