import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {
    username: '',
    password: '',
  };
  loginError = false;
  loginSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    // if(this.user.password=="user@123")
    //   {
    //     this.router.navigate(['/forgotPassword']);
    //   }
    console.log('Login Request Data:', this.user);

    
    this.authService.login(this.user).subscribe(
      (data) => {
        
        console.log('Login Response Data:', data);

     
   if (data.role === 'admin') {
      // Navigate to the admin dashboard
      this.router.navigate(['/Admin_dashboardComponent'], { queryParams: { role: data.role }});
    }
    

    
        this.loginSuccess = true;
      },
      (error) => {
        // Handle error without re-throwing it
        this.loginError = true;
        console.error('Login Error:', error);
      }
    );
  }
  
}

    //  if (data.role === 'employee') {
    //          this.router.navigate(['/dashboard']);
    //     } else