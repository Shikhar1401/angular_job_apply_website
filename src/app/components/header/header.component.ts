import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  check : boolean = false;
  userType: string = '';
  constructor(private router: Router, private authService: AuthenticationService) {
    
   }

  ngOnInit(): void {
    if(firebase.auth().currentUser){
        console.log('exist')
        this.check = true;
        console.log(this.check)
      }

    this.userType = this.authService.userType;

  }
  // checkValue(){
  //   return new Promise((resolve,reject) =>{
  //     if(firebase.auth().currentUser.uid){
  //       var val: boolean = true;
  //     }
      
  //     resolve(val);
  //   })
  // }

  logout(){
    this.authService.SignOut();
    this.router.navigateByUrl('/login');
  }

}
