import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private toast: ToastrService, private authService: AuthenticationService,private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    return this.authService.checkAuth().then(user =>{
      if(user){
        return true;
      }
      else{
        this.router.navigateByUrl('/login');
        this.toast.error('Login First !!!','',{
          timeOut:2500
        })
      }
    });
  }
  
}
