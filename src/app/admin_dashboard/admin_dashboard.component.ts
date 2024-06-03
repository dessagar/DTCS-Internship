import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from  '../data.service';

interface FormData {
  _id: string;
  labelName: string;
  group: string;
  description: string;
}

interface SubtopicData {
  labelName: string;
  selectedSubject: string;
  textareaContent: string;
  isPublished: boolean;
}

interface CardData {
  _id: string;
  label: string;
  functioncall: string;
  isPublished: boolean; // Add this property
}



@Component({
  selector: 'app-admin_dashboard',
  templateUrl: './admin_dashboard.component.html',
  styleUrls: ['./admin_dashboard.component.scss']
})


export class Admin_dashboardComponent implements OnInit {
  leftColumn: any[] = [];
  rightColumn: any[] = [];
  showSuccessMessage: boolean = false;
  subtopicFormData: SubtopicData[] = []; 
  cardsData: CardData[] = [];
  role: string = ''; // Variable to store the role information


  

    constructor(private router: Router, private http: HttpClient , private dataService: DataService , private route: ActivatedRoute) { }


    ngOnInit(): void {
      this.fetchData();
      this.fetchCardData();

      this.route.queryParams.subscribe(params => {
        this.role = params['role'];
      });

    }
    

    fetchCardData() {
      this.http.get<CardData[]>('http://localhost:3000/api/cardsData').subscribe(cardsData => {
        this.cardsData = cardsData;
      });
    }

    updateDefaultCard(card: CardData, event: any) {
      const updatedLabel = event.target.textContent.trim();
      if (updatedLabel !== '') {
        card.label = updatedLabel;
        this.http.put(`http://localhost:3000/api/cardsData/${card._id}`, { label: updatedLabel })
          .subscribe(() => {
            console.log('Card updated successfully');
          }, error => {
            console.error('Error updating card:', error);
            // Rollback changes if update fails
            this.fetchCardData();
          });
      } else {
        // Reset to original label if input is empty
        event.target.textContent = card.label;
      }
    }
  
    deleteDefaultCard(cardId: string) {
      if (confirm('Are you sure you want to delete this card?')) {
        this.http.delete(`http://localhost:3000/api/cardsData/${cardId}`).subscribe(() => {
          console.log('Card deleted successfully');
          // Remove the deleted card from the local array
          this.cardsData = this.cardsData.filter(card => card._id !== cardId);
        }, error => {
          console.error('Error deleting card:', error);
        });
      }
    }

    publishDefaultCard(cardId: string) {
      this.http.put(`http://localhost:3000/api/cardsData/publish/${cardId}`, {}).subscribe(() => {
        console.log('Card published successfully');
        // Update the local cardsData array to reflect the change in UI
        const updatedCardIndex = this.cardsData.findIndex(card => card._id === cardId);
        if (updatedCardIndex !== -1) {
          this.cardsData[updatedCardIndex].isPublished = true;
        }
      }, error => {
        console.error('Error publishing card:', error);
      });
    }
    goTosliderContent(card: any): void { // Assuming `card` is passed as a parameter
      if (this.role) {
        // Navigate to pmsContent page with role and labelName parameters if role is stored
        this.router.navigate(['../slidercontent', card.labelName], { queryParams: { role: this.role } });
      }
    }
    
   
    
    // Inside your component class
    fetchData() {
      this.http.get<any[]>('http://localhost:3000/api/formData').subscribe(formData => {
        // Split data into left and right column based on group
        formData.forEach(data => {
          if (data.group === 'iMedOne Knowledge') {
            this.leftColumn.push(data);
          } else if (data.group === 'Skill Knowledge') {
            this.rightColumn.push(data);
          }
        });
      });

      this.http.get<SubtopicData[]>('http://localhost:3000/api/subtopicFormData').subscribe(subtopicData => {
        this.subtopicFormData = subtopicData;
      });
    }

    // deleteCard(cardId: string, group: string) {
    //   if (group === 'imed') {
    //     this.leftColumn = this.leftColumn.filter(card => card._id !== cardId);
    //   } else if (group === 'skill') {
    //     this.rightColumn = this.rightColumn.filter(card => card._id !== cardId);
    //   }
    //   this.http.delete(`http://localhost:3000/api/formData/${cardId}`).subscribe(() => {
    //     console.log('Card deleted successfully from database');
    //   });
    // }
    // deleteAssociatedSubtopics(subjectLabel: string) {
    //   console.log(subjectLabel);
    //   this.http.delete(`http://localhost:3000/api/subtopics/${subjectLabel}`).subscribe(() => {
    //     console.log('Associated subtopics deleted successfully');
    //   }, (error) => {
    //     console.error('Error deleting associated subtopics:', error);
    //   });
    // }

    //=========================================================================================================================================
    deleteCard(cardId: string, group: string) {
      let subjectLabel: string; // Variable to store subject label
  
      // Find subject label based on card ID
      if (group === 'imed') {
        const deletedCard = this.leftColumn.find(card => card._id === cardId);
        subjectLabel = deletedCard ? deletedCard.labelName : null;
        this.leftColumn = this.leftColumn.filter(card => card._id !== cardId);
      } else if (group === 'skill') {
        const deletedCard = this.rightColumn.find(card => card._id === cardId);
        subjectLabel = deletedCard ? deletedCard.labelName : null;
        this.rightColumn = this.rightColumn.filter(card => card._id !== cardId);
      }
  
      // Delete card from database
      this.http.delete(`http://localhost:3000/api/formData/${cardId}`).subscribe(() => {
        console.log('Card deleted successfully from database');
  
        // If subject label found, delete associated subtopics
        if (subjectLabel) {
          this.deleteAssociatedSubtopics(subjectLabel);
        }
      });
    }
  
    deleteAssociatedSubtopics(subjectLabel: string) {
      console.log(subjectLabel);
      // Assuming your backend endpoint is at http://localhost:3000/api/subtopics/:subjectLabel
      this.http.delete(`http://localhost:3000/api/subtopics/${subjectLabel}`).subscribe(() => {
        console.log('Associated subtopics deleted successfully');
      }, (error) => {
        console.error('Error deleting associated subtopics:', error);
      });
    }
  
    //==========================================================================================================================================

    // deleteCard(cardId: string, group: string) {
    //   // const endpoint = `http://localhost:3000/api/formData/${cardId}`;
    //   this.http.delete(`http://localhost:3000/api/formData/${cardId}`).subscribe(() => {
    //     // Remove card from UI
    //     if (group === 'imed') {
    //       this.leftColumn = this.leftColumn.filter(card => card._id !== cardId);
    //     } else if (group === 'skill') {
    //       this.rightColumn = this.rightColumn.filter(card => card._id !== cardId);
    //     }
    //     // Remove associated subtopics from UI
    //     this.subtopicFormData = this.subtopicFormData.filter(subtopic => subtopic.selectedSubject !== cardId);
    //   }, error => {
    //     console.error('Error deleting card:', error);
    //   });
    // }

    // toggleEditMode(card: FormData) {3
    //   card.editMode = !card.editMode;
    // }
  
    updateCard(card: FormData, event: any) {
      const updatedLabelName = event.target.textContent.trim();
      if (updatedLabelName !== '') {
        card.labelName = updatedLabelName;
        this.http.put(`http://localhost:3000/api/formData/${card._id}`, { labelName: updatedLabelName })
          .subscribe(() => {
            console.log('Card updated successfully');
          });
      } else {
        // Reset to original labelName if input is empty
        event.target.textContent = card.labelName;
      }
    }


    publishCard(cardId: string) {
      this.http.put(`http://localhost:3000/api/formData/publish/${cardId}`, {}).subscribe(() => {
        console.log('Card published successfully');
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          // this.router.navigate(['../Admin_dashboardComponent']);
        }, 2000); // Adjust the timeout as needed
        // Update the UI or fetch data again if needed
      });
    }

    

    // Add this method in your component class
    getSubtopicCount(labelName: string): number {
      // Filter the subtopicFormData array based on selectedSubject matching the labelName
      const subtopics = this.subtopicFormData.filter(subtopic => subtopic.selectedSubject === labelName);
      return subtopics.length;
    }

    logout() {
        this.router.navigate(['/MasterAdminlogin']);
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
    console.log("hii from nts");
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/pmsFlow'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }
  goToCareFlow(): void {
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/careFlow'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }
  goToLsmFlow(): void {
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/lsmFlow'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }
  goToDocFlow(): void {
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/docopFlowPage'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }
  goToBillFlow(): void {
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/billingFlow'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }
  goToAsmFlow(): void {
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/amsFlowPage'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }
  goToGrmFlow(): void {
    if (this.role === 'admin') { // Ensure role is 'admin' before navigating
      // Navigate to pmsFlow page with role information as query parameter
      this.router.navigate(['/grmFlow'], { queryParams: { role: this.role } });
    } else {
      console.error('Invalid role:', this.role); // Log error if role is not 'admin'
    }
  }

     
    

}
