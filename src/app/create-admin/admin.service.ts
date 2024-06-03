import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000'; // Replace this with your actual backend server URL

  constructor(private http: HttpClient) { }

  createAdmin(adminData: any) {
    return this.http.post(`${this.baseUrl}/api/admin`, adminData);
  }
}
