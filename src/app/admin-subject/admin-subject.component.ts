import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss']
})
export class AdminSubjectComponent implements OnInit {
  formData: any[] = [];
  selectedItem: string = 'Select';
  // selectedSubject: string='';


  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize with default selection or trigger fetching data based on user selection
    this.fetchData('iMedOne Knowledge');
  }

//   onEditClick(subjectName: string) {
//     // Pass the subject name as a route parameter
//     this.router.navigate(['../admin_subtopic', subjectName]);
// }

  

  // onSelectItem(item: string) {
  //   this.selectedItem = item;
  //   this.fetchData(item);
  // }

  onSelectItem(item: string) {
    this.selectedItem = item;
    if (this.selectedItem !== 'Select') { // Check if item is not 'Select'
      this.fetchData(this.selectedItem);
    }
  }

  // fetchData(group: string) {
  //   this.http.get<any[]>(`http://localhost:3000/api/formData/${group}`).subscribe(data => {
  //     this.formData = data;
  //   });
  // }

  fetchData(group: string) {
    this.http.get<any[]>(`http://localhost:3000/api/formData/${group}`).subscribe({
      next: (data) => {
        this.formData = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }


 
}
