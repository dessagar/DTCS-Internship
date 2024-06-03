import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from './admin.service';




@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent {

  name: string = '';
  email: string = '';
  mobile: string = '';
  password: string | null = null;

  constructor(private router: Router, private http: HttpClient, private adminService: AdminService) { }


  createAdmin() {
    // Concatenate the default prefix +91 with the mobile number input
    // const mobileWithPrefix = '+91' + this.mobile;
    const adminData = { name: this.name, email: this.email, mobile: this.mobile };
    this.adminService.createAdmin(adminData).subscribe(
      response => {
        console.log(response); // handle response from server
      },
      error => {
        console.error(error); // handle error
      }
    );
  }


  

  logout() {
    this.router.navigate(['/login']);
  }


}
