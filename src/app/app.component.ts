import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'role-authentication';
  constructor(private router: Router) {
    const isNewTab = localStorage.getItem('isNewTab');
    if (!isNewTab) {
      localStorage.setItem('isNewTab', 'true');
      this.router.navigate(['/TrainingApp']);
    }
  }
}
