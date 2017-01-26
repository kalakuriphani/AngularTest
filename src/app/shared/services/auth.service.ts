
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {UserModel} from "../model/user.model";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthService {

  public token: string;
  public loggedUser:UserModel;
  public isAuthenticated:boolean = false;

  constructor(private http: Http, private router:Router) {
    // set token if saved in local storage
//    var pdmwebAppUser = JSON.parse(localStorage.getItem('pdmwebUser'));
//    this.token = pdmwebAppUser && pdmwebAppUser.token;
  }

    login(username, password): Promise<any> {
      this.loggedUser = null;
      this.isAuthenticated = false;
      let credentials = {
        username : username,
        password : password
      };
      let self = this;
      return this.http.post(environment.authUrl + '/authenticate', credentials).toPromise()
        .then(function (response: any) {
          if (response.status === 200) {
            console.debug('login successful');
            self.isAuthenticated = true;
            self.loggedUser = new UserModel();
            self.loggedUser.username = username;
            return {
              success : true
            };
          }
          throw 'Unexpected response status = ' + response.status;
        })
        .catch(function (error: any) {
          console.debug('login failed with status code = ' + error.status);
          let result = error.json();
          return {
            success : false,
            code : result.code,
            message : result.message
          };
        });
    }

    // TODO: to be implemented when using token from backend

  // login(username, password): Observable<boolean> {
  //   return this.http.post('/authenticate', { username: username, password: password })
  //     .map((response: Response) => {
  //       // let token = response.token;
  //       let token = response.json() && response.json().token;
  //       if (token) {
  //         this.token = token;
  //         this.user = response.json().user;
  //         localStorage.setItem('pdmwebUser', JSON.stringify({id:this.user.id, token: token }));
  //           this.isAuthenticated = true;
  //       }
  //
  //       return response.json().success;
  //
  //     });
  // }


//  login(username, password): Observable<boolean> {
//    return this.http.post('/authenticate', { username: username, password: password })
//      .map((response: Response) => {
//        // let token = response.token;
//        let token = response.json() && response.json().token;
//        if (token) {
//          this.token = token;
//          this.user = response.json().user;
//          localStorage.setItem('pdmwebUser', JSON.stringify({_id:this.user._id, token: token }));
//        }
//        return response.json().success;
//      });
//  }

  logout(): void {
      this.isAuthenticated = false;
      this.loggedUser = null;
      this.router.navigate(['/home']);
    // clear token remove user from local storage to log user out
//    this.token = null;
//    localStorage.removeItem('pdmwebUser');
  }
}

// return this.http.post(url, body, options) // ...using post request
//   .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
//   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
