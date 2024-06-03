import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pms-flow',
  templateUrl: './pms-flow.component.html',
  styleUrls: ['./pms-flow.component.scss']
})
export class PmsFlowComponent {
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
  goToPmsContent(): void {
    if (this.role) {
      // Navigate to pmsContent page with role parameter if role is stored
      this.router.navigate(['/pmsContent'], { queryParams: { role: this.role } });
    } else {
      // Navigate to pmsContent page without role parameter if role is not stored
      this.router.navigate(['/pmsContent']);
    }
  }
  toggleDetailedView() {
    this.showDetailedView = !this.showDetailedView;
  }

  logout() {
    this.router.navigate(['/login']);
  }


}
