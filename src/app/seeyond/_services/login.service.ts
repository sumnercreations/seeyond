import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import { User } from '../_models/user';

@Injectable()
export class LoginService {
  onUserLoggedIn = new EventEmitter<User>();
  apiUrl = 'https://' + environment.API_URL + '/auth/login';

  constructor(
    private http: Http,
    private user: User
  ) { }

  login(email: string, password: string) {
    var formData = {
      "email": email,
      "password": password
    }
    return this.http.post(this.apiUrl, formData)
      .map((response: Response) => {
        let api = response.json();
        if(api && !api.result.error) {
          localStorage.setItem('seeyondUser', JSON.stringify(api.result.user));
          this.user = api.result.user;
          this.onUserLoggedIn.emit(this.user);
        }
      });
  }

  logout() {
    localStorage.removeItem('seeyondUser');
    console.log(this.user);
    this.user.uid = null;
    this.user.email = null;
    this.user.firstname = null;
    this.user.lastname = null;
    console.log(this.user);
  }

}
