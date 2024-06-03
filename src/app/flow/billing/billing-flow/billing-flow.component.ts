import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-billing-flow',
  templateUrl: './billing-flow.component.html',
  styleUrls: ['./billing-flow.component.scss']
})
export class BillingFlowComponent {
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
  goToBillContent(): void {
    if (this.role) {
      // Navigate to pmsContent page with role parameter if role is stored
      this.router.navigate(['/billingContent'], { queryParams: { role: this.role } });
    } else {
      // Navigate to pmsContent page without role parameter if role is not stored
      this.router.navigate(['/billingContent']);
    }
  }
  toggleDetailedView() {
    this.showDetailedView = !this.showDetailedView;
  }
}
