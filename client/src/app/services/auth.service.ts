import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../interfaces/auth';
import { register } from '../interfaces/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';


const token = localStorage.getItem('access_token');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    token: `${token}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://alumni-ap-test.herokuapp.com/api/';
  // baseURL = 'http://localhost:7073/api/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  getToken() {
    return localStorage.getItem('access_token');
  }

  register(user: register) {
    return this.http.post(`${this.baseURL}` + 'register', user);
  }

  login(user: login) {
    return this.http.post(`${this.baseURL}` + 'login', user);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    this.clearCookies()
    return authToken !== null ? true : false;
  }
  resetNew(password:any,employee_number:any){
    return this.http.put(`${this.baseURL}newuser/${employee_number}`,password)
  }

  doLogout() {
    localStorage.setItem('r', '');
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      return this.router.navigate(['/auth/login']);
    } else return removeToken == null;
  }

  getUserProfile() {
    return this.http.get(`${this.baseURL}getUsers`, httpOptions);
  }


  clearCookies() {
    localStorage.removeItem('twoFactorToken');
    localStorage.removeItem('codeExpiry');
    localStorage.removeItem('isSessionActive');
    localStorage.removeItem('attemptsRemaining');
    localStorage.removeItem('codeSendSuccess');
    localStorage.removeItem('user_id');
  }

  decodeToken(token: any): any {
    try{
        return jwt_decode(token);
    }catch (err){
        return err;
    }
  }
}

