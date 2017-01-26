import {Injectable} from '@angular/core';
import { CanActivate,Router} from '@angular/router'
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService:AuthService) {
  }

  canActivate() {
     if(!this.authService.isAuthenticated){
       this.router.navigate(['/login']);
       return false;
     }else{
       return true;
     }

    // if (localStorage.getItem('pdmUser')) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;
  }

}
