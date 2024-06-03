import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewService } from '../preview.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcontent',
  templateUrl: './subcontent.component.html',
  styleUrls: ['./subcontent.component.scss']
})
export class SubcontentComponent {
  subtopic: any;
  labelName!: string;
  recentlyUploadedFilenames: string[] = [];
  storedData: any = {};


  constructor(private route: ActivatedRoute, private previewService: PreviewService,
    private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const labelName = params['labelName'];
      console.log(labelName);
      this.previewService.getSubtopicByLabelName(labelName).subscribe(data => {
        this.subtopic = data;
        console.log('Subtopic data:', this.subtopic); // Add this line
      });
    });
    // Get the labelName from the route parameters
    this.route.params.subscribe(params => {
      this.labelName = params['labelName'];
      // Fetch recently uploaded filenames based on labelName
      this.dataService.getRecentlyUploadedFilenames(this.labelName).subscribe(
        filenames => {
          this.recentlyUploadedFilenames = filenames;
          console.log('Recently Uploaded Files:', this.recentlyUploadedFilenames);
        },
        error => {
          console.error('Error fetching recently uploaded filenames:', error);
          // Handle error
        }
      );
    });
    this.previewService.getStoredData().subscribe(
      data => {
        console.log('Fetched data:', data); // Log the fetched data
        this.storedData = data;
      },
      error => {
        console.error('Error fetching stored data:', error);
      }
    );
  }
  
 

  isImageFile(file: string): boolean {
    return file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') ||
           file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.gif');
  }

  isVideoFile(file: string): boolean {
    return file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.webm') ||
           file.toLowerCase().endsWith('.mov') || file.toLowerCase().endsWith('.mkv');
  }

  getFilePath(file: string): string {
    const baseUrl = 'http://localhost:3000'; // Update this with your actual base URL
    return `${baseUrl}/uploads/${this.labelName}/${file}`;
  }
  logout() {
    this.router.navigate(['/MasterAdminlogin']);
  }
  }
  

