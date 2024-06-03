import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  /** 
 login(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post(`${this.baseUrl}/login`, body);
  }
  */

  login(user: any): Observable<any> {
    console.log('in auth service login method.');
    const url = `${this.baseUrl}/login`;
    console.log('auth service ts 2')
    return this.http.post(url, user, { withCredentials: false });
  }

  

  signup(user: any): Observable<any> {
    const url = `${this.baseUrl}/signup`;
    return this.http.post(url, user);
  }
}
