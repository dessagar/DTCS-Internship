import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PreviewService } from '../preview.service';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-admin-subtopic',
  templateUrl: './admin-subtopic.component.html',
  styleUrls: ['./admin-subtopic.component.scss']
})
export class AdminSubtopicComponent implements OnInit {
  cards: any[] = [];
  deletionMessage: string = '';



  // ngOnInit(): void {
  //   this.fetchSubtopics();
  //   this.route.params.subscribe(params => {
  //       this.selectedSubject = params['subjectName'];
  //   });
  // }
  //  fetchSubtopics() {
  //   this.http.get<any[]>('http://localhost:3000/subtopics')
  //     .subscribe((data: any[]) => {
  //       this.cards = data;
  //       console.log('Fetched cards:', this.cards);
  //     });
  // }
  selectedSubject!: string;
  subtopics: any[] = [];

  constructor(private route: ActivatedRoute, private previewService: PreviewService,private http: HttpClient) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.selectedSubject = params['labelName']; // Assuming labelName matches selected subject
      this.fetchSubtopics();
    });
    this.route.params.subscribe(params => {
      this.selectedSubject = params['subjectName'];
  });
  }

  fetchSubtopics() {
    this.previewService.gettopicsBySubject(this.selectedSubject).subscribe(data => {
      this.cards = data;
    });
  }
  
  deleteCard(cardId: string) {
    this.http.delete(`http://localhost:3000/subtopics/${cardId}`, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.cards = this.cards.filter(card => card._id !== cardId); 
          this.deletionMessage = 'Subtopic deleted successfully';
        } else {
          console.error('Unexpected status code:', response.status);
          this.deletionMessage = 'Error deleting card';
        }
        setTimeout(() => {
          this.deletionMessage = '';
        }, 3000); 
      }, (error: HttpErrorResponse) => {
        console.error(error);
        this.deletionMessage = 'Error deleting card';
        setTimeout(() => {
          this.deletionMessage = '';
        }, 3000); 
      });
  }
}
  // deleteCard(cardId: string) {
  //   this.http.delete(`http://localhost:3000/subtopics/${cardId}`)
  //     .subscribe(() => {
  //       // Remove the deleted card from the local array
  //       this.cards = this.cards.filter(card => card._id !== cardId);
  //     });
  // }


// }
  
  // fetchTitleAndDescriptionData(): void {
  //   this.cardService.fetchTitleAndDescription()
  //     .subscribe(
  //       (response: any[]) => {
  //         this.titleDescriptionData = response;
  //       },
  //       (error) => {
  //         console.error('Error fetching title and description data:', error);
  //       }
  //     );
  // }


//   deleteCard(event: MouseEvent, index: number) {
//     const cardElement = (event.target as HTMLElement).closest('.card');
    
//     if (cardElement) {
//         cardElement.remove();
//     }
//     this.titleDescriptionData.splice(index, 1);
// }

// deleteCard(event: MouseEvent, index: number) {
//   const itemId = this.titleDescriptionData[index]._id;

//   this.cardService.deleteTitleDescription(itemId)
//     .subscribe(
//       () => {
//         this.titleDescriptionData.splice(index, 1);
//         console.log('Item deleted successfully');
//       },
//       (error) => {
//         console.error('Error deleting item:', error);
//       }
//     );
// }
// toggleAddSubtopic() {
//   this.showAddSubtopicForm = !this.showAddSubtopicForm;
// }


// addSubtopic() {
//   // Add the new subtopic to the list
//   this.subtopics.push({
//       title: this.newSubtopicTitle,
//       description: this.newSubtopicDescription,
//       subCount: 0 // Initially set to 0, you can adjust as needed
//   });

//   // Reset the form fields
//   this.newSubtopicTitle = '';
//   this.newSubtopicDescription = '';

//   // Hide the form
//   this.showAddSubtopicForm = false;
// }

//     deleteSubtopic(subtopic: any) {
//         // Implement deletion logic here, you may remove the subtopic from the array
//         const index = this.subtopics.indexOf(subtopic);
//         if (index !== -1) {
//             this.subtopics.splice(index, 1);
//         }
//     }

