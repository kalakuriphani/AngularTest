import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers,RequestOptions,Response} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:Http) {
  }

  saveUser(user:any): Observable<any> {

    let serialized:string = objectToQueryParams(user);
    let body = JSON.stringify(user);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/signup?'+serialized,null,null)
      .map((response: Response) => response.json());
    // return this.http.post('/signup',body,options)
  }
}

function objectToQueryParams(obj:any):string {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      // str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      str.push(p + "=" + obj[p]);
    }
  return str.join("&");
}
