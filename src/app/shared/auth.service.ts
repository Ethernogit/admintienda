import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment.local';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl: string = environment.apiUrl;

  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl+'/api/auth/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/api/auth/loginback', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/auth/user-profile');
  }
}
