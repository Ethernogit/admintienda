import { Injectable } from '@angular/core';
import { environment } from 'src/environment.local';
import { Observable } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl: string = environment.apiUrl;

  private issuer = {
    login: this.apiUrl + '/api/auth/login',
    register:this.apiUrl + '/api/auth/register',
  };

  constructor(
    private _http: HttpClient,

  ) {

  }
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
    //revisar estatus con el back
  statusback():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.apiUrl+'/api/auth/refresh',{headers:headers});
  }
}
