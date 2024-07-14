import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  error: string = '';


  constructor(private http: HttpClient) {}

  updatePassword(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const password = (document.getElementById('pass') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmpass') as HTMLInputElement).value;
  
    if (!name || !password || !confirmPassword) {
      this.error = 'Please fill out all fields';
      this.message = '';
      return;
    }

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      this.message = '';
      return;
    }
  
    this.http.post<any>('http://localhost:3000/updatepassword', { name, password, confirmPassword })
      .subscribe(
        res => {
          this.message = res.message;
          this.error = '';
        },
        err => {
          this.error = err.error;
          this.message = '';
        }
      );
  }
}
