import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  emailId: string;
  pass: string;
  userType: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onChange(e) {
    this.userType=e;
  }

  signUp(){
    this.authService.signup(this.emailId,this.pass,this.userType)
    console.log(this.emailId,this.pass);
    this.emailId= '';
    this.pass='',
    this.userType='';
  }
  //  onSubmit(f){
  //   console.log(f)
  //   console.log(f.form.value.email,f.form.value.password,f.form.value.userType)
  // }

}
