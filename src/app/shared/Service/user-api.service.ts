import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAPI } from '../model/user-api';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  APIService = environment.Api;
  user: UserAPI;
  token: string = '';
  constructor(private http: HttpClient) {}

  //get user token
  GetTokenUser(obj: UserAPI) {
    let headers = new HttpHeaders().append(
      'Content-Type',
      'application/json;charset=utf-8'
    );

    return this.http
      .post(this.APIService + 'User/Auth', obj, { responseType: 'text' })
      .pipe();

    //  await this.http.post(this.APIService, obj, { observe: 'response' }).subscribe((response:HttpResponse<any>)=>{console.log(response.headers.get("Authorization"))});
  }

  //get user
  getSingelUsers() {
    let headers = new HttpHeaders().append(
      'Authorization',
      sessionStorage.getItem('Token')
    );
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('https://localhost:44342/api/User/', { headers: headers })
      .pipe();
  }

  //get admin token

  async GETTOKENADMIN(obj) {
    let headers = new HttpHeaders().append(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    await this.http
      .post(this.APIService + 'Admin/Auth', obj, { responseType: 'text' })
      .toPromise<any>()
      .then(
        (Data) => {
          this.token = Data;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    sessionStorage.setItem('Token', this.token);
    console.log(this.token);
  }

  //get admin
  async GETADMIN() {
    let headers = new HttpHeaders().append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');
    await this.http
      .get('https://localhost:44342/api/Admin/', { headers: headers })
      .toPromise<any>()
      .then(
        (Data: any) => {
          this.user = Data;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    return this.user;
  }

  //get all user for admin
  GET_ALL_USERS_FOR_ADMIN() {
    let headers = new HttpHeaders().append(
      'Authorization',
      sessionStorage.getItem('Token')
    );
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('https://localhost:44342/api/Admin/GetAll', {
        headers: headers,
      })
      .pipe();
  }

  //add new user
  ADDUSER(obj: any) {
    return this.http.post(this.APIService + 'User', obj).pipe();
  }

  UpdateUser(id, obj) {
    return this.http.put(this.APIService + 'User/' + id, obj).pipe();
  }

  GetUserById(id) {
    return this.http.get(this.APIService + 'User/' + id).pipe();
  }

  DeleteUser(id) {
    return this.http.delete(this.APIService + 'User/' + id).pipe();
  }

  CheckEmail(Email) {
    debugger
    let obj: UserAPI = {
      email: Email,
    };
    return this.http.post(this.APIService + 'User/CheckEmail/', obj).pipe();
  }
}
