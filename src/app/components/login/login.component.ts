import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   emailId = '';
   pass = '';
   user = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onChange(e) {
    this.user=e;
  }
  signIn(){
    this.authService.signin(this.emailId,this.pass);
    console.log(this.emailId,this.pass)
  }

  resetPass(){
    this.authService.resetPassword(this.emailId);
  }

  //  onSubmit(f){
  //   console.log(f)
  //   console.log(f.form.value.email,f.form.value.password,f.form.value.userType)
  // }

}
