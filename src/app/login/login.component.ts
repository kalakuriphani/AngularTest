import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {

  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.logout();
  }

  cancel() {
    this.loading = false;
    this.error = '';
    this.router.navigate(['']);
  }

  login():void {
     if(this.authService.login(this.model.username,this.model.password )){
        this.router.navigate(['/home']);
      }else{
         this.error = 'Incorrect email or password'
      }
  }


  logout(): void {
  }

}
