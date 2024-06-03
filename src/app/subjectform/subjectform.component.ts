import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subjectform',
  templateUrl: './subjectform.component.html',
  styleUrls: ['./subjectform.component.scss']
})
export class SubjectformComponent {
  labelName: string = ''; // Initialize properties here
  selectedGroup: string = '';
  description: string = '';
  showSuccessMessage: boolean = false;
  showPublishmessage: boolean = false;

  publishButtonDisabled: boolean = true;
  isSaveButtonDisabled: boolean = false;
  saveButtonText: string = "Save";


  constructor(private http: HttpClient,private router: Router) {}

  save() {
    const formData = {
      labelName: this.labelName,
      group: this.selectedGroup,
      description: this.description
    };

    this.http.post<any>('http://localhost:3000/subjectform', formData).subscribe(response => {
      console.log('Data saved successfully!', response);
    //  alert('Subject added successfully!');
    //  console.log('Data saved successfully!', response);
      this.showSuccessMessage = true;
      this.isSaveButtonDisabled = true;
      this.saveButtonText = "Saved";
      this.publishButtonDisabled = false;
      // Reset the form after successful submission if needed
      // this.resetForm();
      setTimeout(() => {
        this.showSuccessMessage = false;
        // this.router.navigate(['../Admin_dashboardComponent']);
      }, 3000); // Adjust the timeout as needed
    }, error => {
      console.error('Error saving data:', error);
    });
  }

  

  resetForm() {
    this.labelName = '';
    this.selectedGroup = '';
    this.description = '';
  }
  publish() {
    const formData = {
      labelName: this.labelName,
      selectedGroup: this.selectedGroup,
      description: this.description
    };

    this.http.post<any>('http://localhost:3000/api/publish', formData).subscribe(response => {
      if (response.success) {
        console.log('Published successfully!');
        this.showPublishmessage = true;
        this.resetForm();
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['../Admin_dashboardComponent']);
        }, 3000); // Adjust the timeout as needed
      } else {
        console.error('Failed to publish.');
      }
    });
  }


  cancel() {
    // Implement cancel logic if needed
  }

  
}
