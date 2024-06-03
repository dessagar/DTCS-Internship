import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PreviewService } from '../preview.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tile-subject',
  templateUrl: './tile-subject.component.html',
  styleUrls: ['./tile-subject.component.scss']
})
export class TileSubjectComponent implements OnInit {
  labelName!: string;
  subject: any; // Modify this type according to your data structure
  subjectName!: string;
  subtopics: any[] = [];
  deletionMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private previewService: PreviewService,
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.location.replaceState(this.location.path());
    this.route.params.subscribe(params => {
      this.labelName = params['labelName'];

    });
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
    this.previewService.getSubjectData(this.labelName).subscribe(data => {
      this.subject = data;
    });
  }

  fetchSubtopics() {
    this.previewService.getSubtopicsBySubject(this.subjectName).subscribe(data => {
      this.subtopics = data;
    });
  }

  deleteCard(subtopicId: string, labelName: string) {
    this.http.delete(`http://localhost:3000/subtopics/${subtopicId}`, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.subtopics = this.subtopics.filter(subtopic => subtopic._id !== subtopicId); 
          this.deletionMessage = 'Subtopic deleted successfully';

          // After deleting the subtopic, also delete the associated files
          this.deleteAssociatedFiles(labelName);
        } else {
          console.error('Unexpected status code:', response.status);
          this.deletionMessage = 'Error deleting subtopic card';
        }
        setTimeout(() => {
          this.deletionMessage = '';
        }, 3000); 
      }, (error: HttpErrorResponse) => {
        console.error(error);
        this.deletionMessage = 'Error deleting subtopic card';
        setTimeout(() => {
          this.deletionMessage = '';
        }, 3000); 
      });
  }

  deleteAssociatedFiles(labelName: string) {
    this.http.delete(`http://localhost:3000/deleteFiles?labelName=${labelName}`, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log('Files deleted successfully');
        } else {
          console.error('Unexpected status code:', response.status);
        }
      }, (error: HttpErrorResponse) => {
        console.error(error);
      });
  }

  publishSubtopic(subtopicId: string, labelName: string) {
    this.previewService.publishSubtopic(subtopicId).subscribe((response: any) => {
      if (response.success) {
        // Update the isPublished flag locally
        const subtopicIndex = this.subtopics.findIndex(subtopic => subtopic.labelName === labelName);
        console.log("Subtopic published successfully..!!");
        if (subtopicIndex !== -1) {
          this.subtopics[subtopicIndex].isPublished = true;
        }
      } else {
        // Handle error
      }
    });
  }
  logout() {
    this.router.navigate(['/MasterAdminlogin']);
  }
  // Method to refresh the component and reload data

  }

