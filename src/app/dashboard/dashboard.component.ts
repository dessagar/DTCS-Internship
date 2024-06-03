import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

// import { CardService } from '../admin_dashboard/card.service';

interface CardData {
  _id: string;
  label: string;
  functioncall: string;
  isPublished: boolean; // Add this property
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  leftColumn: any[] = [];
  rightColumn: any[] = [];
  cardsData: CardData[] = [];
  role: string = ''; // Variable to store the role information



  constructor(private router: Router, private http: HttpClient , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCardsData();
    
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
    });
  }

  
  goTosliderContent(card: any): void { // Assuming `card` is passed as a parameter
      // Navigate to pmsContent page with role and labelName parameters if role is stored
      this.router.navigate(['../slidercontent', card.labelName]);
  }
  // fetchData() {
  //   this.http.get<any[]>('http://localhost:3000/api/formData').subscribe(formData => {
  //     // Split data into left and right column based on group
  //     formData.forEach(data => {
  //       if (data.group === 'iMedOne Knowledge') {
  //         this.leftColumn.push(data);
  //       } else if (data.group === 'Skill Knowledge') {
  //         this.rightColumn.push(data);
  //       }
  //     });
  //   });
  // }

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/api/formData?isPublished=true').subscribe(formData => {
      // Split data into left and right column based on group
      formData.forEach(data => {
        if (data.group === 'iMedOne Knowledge') {
          this.leftColumn.push(data);
        } else if (data.group === 'Skill Knowledge') {
          this.rightColumn.push(data);
        }
      });
      this.getLeftColumnSubtopicCounts();
      this.getRightColumnSubtopicCounts();
    });
  }

  fetchCardsData() {
    // Make HTTP GET request to fetch card data
    this.http.get<any[]>('http://localhost:3000/api/cards').subscribe(
      (data: any[]) => {
        // Filter cardsData to include only where isPublished is true
        this.cardsData = data.filter(card => card.isPublished === true);
      },
      error => {
        console.error('Error fetching card data:', error);
      }
    );
  }

  // getSubtopicCount(labelName: string): void {
  //   this.http.get<any>(`http://localhost:3000/api/subtopic/count?selectedSubject=${labelName}`).subscribe(count => {
  //     const card = this.leftColumn.find(item => item.labelName === labelName);
  //     if (card) {
  //       card.subtopicCount = count;
  //     }
  //   });
  // }

  getLeftColumnSubtopicCounts() {
    this.leftColumn.forEach(item => {
      this.http.get<any>(`http://localhost:3000/api/subtopic/count?selectedSubject=${item.labelName}`).subscribe(count => {
        item.subtopicCount = count;
      });
    });
  }

  getRightColumnSubtopicCounts() {
    this.rightColumn.forEach(item => {
      this.http.get<any>(`http://localhost:3000/api/subtopic/count?selectedSubject=${item.labelName}`).subscribe(count => {
        item.subtopicCount = count;
      });
    });
  }

    logout() {
    // Clear user-related information (if any)
    // For example, you may need to clear authentication tokens or user data from the local storage

    // Navigate to the login page
    this.router.navigate(['/login']);
  }


  executeFunction(functionCall: string) {
    switch (functionCall) {
      case 'goToPmsFlow()':
        this.goToPmsFlow();
        break;
      case 'goToCareFlow()':
        this.goToCareFlow();
        break;
      case 'goToLsmFlow()':
        this.goToLsmFlow();
        break;
      case 'goToDocFlow()':
          this.goToDocFlow();
          break;
      case 'goToBillFlow()':
          this.goToBillFlow();
          break;
      case 'goToAsmFlow()':
          this.goToAsmFlow();
          break;
      case 'goToGrmFlow()':
            this.goToGrmFlow();
            break;
      // Add cases for other functions as needed
      default:
        console.error('Function not found:', functionCall);
        break;
    }
  }


   // Function to navigate to respective flow page Flow page
goToPmsFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/pmsFlow'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/pmsFlow']); // Log error if role is not 'admin'
}
}
goToCareFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/careFlow'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/careFlow']); // Log error if role is not 'admin'
}
}
goToLsmFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/lsmFlow'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/lsmFlow']); // Log error if role is not 'admin'
}
}
goToDocFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/docopFlowPage'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/docopFlowPage']); // Log error if role is not 'admin'
}
}
goToBillFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/billingFlow'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/billingFlow']); // Log error if role is not 'admin'
}
}
goToAsmFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/amsFlowPage'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/amsFlowPage']); // Log error if role is not 'admin'
}
}
goToGrmFlow(): void {
if (this.role === 'admin') { // Ensure role is 'admin' before navigating
  // Navigate to pmsFlow page with role information as query parameter
  this.router.navigate(['/grmFlow'], { queryParams: { role: this.role } });
} else {
  this.router.navigate(['/grmFlow']); // Log error if role is not 'admin'
}
}

}
