import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { PreviewService } from '../preview.service';
import {EmpPreviewService} from '../emp-preview.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emptile-subject',
  templateUrl: './emptile-subject.component.html',
  styleUrls: ['./emptile-subject.component.scss']
})
export class EmptileSubjectComponent {

  labelName!: string;
  subject: any; // Modify this type according to your data structure
  subjectName!: string;
  subtopics: any[] = [];
  // cards: any[] = [];
  deletionMessage: string = '';

  constructor(private route: ActivatedRoute, private EmpPreviewService: EmpPreviewService,private http: HttpClient) { }

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.labelName = params['labelName'];
      this.fetchSubjectData();
    });
    this.route.params.subscribe(params => {
      this.subjectName = params['labelName']; // Assuming labelName matches the subject name
      this.fetchSubtopics();
    });
    
  }

  fetchSubjectData() {
    this.EmpPreviewService.getSubjectData(this.labelName).subscribe(data => {
      this.subject = data;
    });
  }
  fetchSubtopics() {
    this.EmpPreviewService.getSubtopicsBySubject(this.subjectName).subscribe(data => {
      this.subtopics = data;
    });
  }
  // fetchSubtopics() {
  //   this.previewService.gettopicsBySubject(this.selectedSubject).subscribe(data => {
  //     this.cards = data;
  //   });
  // }

  // getSubtopics(): void {
  //   console.log("in simple ts file");
  //   this.EmpPreviewService.getSubtopics()
  //     .subscribe(subtopics => {
  //       // Filter subtopics where isPublished is true
  //       this.subtopics = subtopics.filter(subtopic => subtopic.isPublished);
  //     });
  // }
  
  deleteCard(cardId: string) {
    this.http.delete(`http://localhost:3000/subtopics/${cardId}`, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.subtopics = this.subtopics.filter(subtopic => subtopic._id !== cardId); 
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

  publishSubtopic(subtopicId: string, labelName: string) {
    this.EmpPreviewService.publishSubtopic(subtopicId).subscribe((response: any) => {
      if (response.success) {
        // Update the isPublished flag locally
        const subtopicIndex = this.subtopics.findIndex(subtopic => subtopic.labelName === labelName);
        console.log("Subtopic published successfully..!!")
        if (subtopicIndex !== -1) {
          this.subtopics[subtopicIndex].isPublished = true;
        }
      } else {
        // Handle error
      }
    });
  }

  fetchSubtopicsData() {
    // Make HTTP GET request to fetch subtopic data
    this.http.get<any[]>('/api/subtopics').subscribe(
      (data: any[]) => {
        // Filter subtopics array to include only where isPublished is true
        this.subtopics = data.filter(subtopic => subtopic.isPublished === true);
      },
      error => {
        console.error('Error fetching subtopic data:', error);
      }
    );
  }

}
