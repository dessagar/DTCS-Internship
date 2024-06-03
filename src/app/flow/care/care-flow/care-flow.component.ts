import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-care-flow',
  templateUrl: './care-flow.component.html',
  styleUrls: ['./care-flow.component.scss']
})
export class CareFlowComponent {
  showDetailedView = false;
  role: string = ''; // Variable to store the role information


  constructor (private router: Router,private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    // Extract role from query parameters only if 'role' parameter exists
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.role = params['role'];
      }
    });
  }
  goToCareContent(): void {
    if (this.role) {
      // Navigate to pmsContent page with role parameter if role is stored
      this.router.navigate(['/careContent'], { queryParams: { role: this.role } });
    } else {
      // Navigate to pmsContent page without role parameter if role is not stored
      this.router.navigate(['/careContent']);
    }
  }
  toggleDetailedView() {
    this.showDetailedView = !this.showDetailedView;
  }
}
