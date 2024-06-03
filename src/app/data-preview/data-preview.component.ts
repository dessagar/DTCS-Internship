// data-preview.component.ts

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PreviewService } from '../preview.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
})
export class DataPreviewComponent implements OnInit {
  storedData: any = {};
  uploadedFiles: any[] = [];
  files: string[] = []; // Array to store filenames
  recentlyUploadedFilenames: string[] = [];
  showSuccessMessage: boolean = false;
  showPublishedMessage:boolean =false;

  publishButtonDisabled: boolean = true;
  isSaveButtonDisabled: boolean = false;
  saveButtonText: string = "Save";

  labelName!: string;
  selectedSubject!: string;
  description!: string;
  fileDescriptions: string[] = []; // Ensure this array is populated with descriptions





  constructor(private previewService: PreviewService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit(): void {
     // Retrieve query parameters
     this.route.queryParams.subscribe(params => {
      this.labelName = params['labelName'];
      this.selectedSubject = params['selectedSubject'];
      this.description = params['textareaContent'];
      this.files = params['files']; // Retrieve files parameter
      this.fileDescriptions = params['fileDescriptions']; // Assuming 'fileDescriptions' are passed as a query param

      
      this.fetchFilesFromFolder(this.labelName);

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
   // this.getRecentlyUploadedFiles();
// Get the labelName from the route params

}

fetchFilesFromFolder(labelName: string): void {
  // Construct the folder path based on labelName
  const folderPath = `http://localhost:3000/api/subtopicform/${labelName}/files`; // Adjust the path as needed

  // Fetch files from the folder
  this.http.get<string[]>(folderPath).subscribe(
    files => {
      this.files = files;
    },
    error => {
      console.error('Error fetching files:', error);
      // Handle error
    }
  );
}



  // getRecentlyUploadedFiles(): void {
  //   this.dataService.getRecentlyUploadedFilenames()
  //     .subscribe(files => {
  //       // Update uploadedFiles array with recently uploaded files
  //       this.uploadedFiles = files;
  //     });
  // }
  onSave() {
    this.showSuccessMessage = true;
    this.isSaveButtonDisabled = true;
    this.saveButtonText = "Saved";
    this.publishButtonDisabled = false;
    setTimeout(() => {
      this.showSuccessMessage = false;
      // Display the alert for 3 seconds
      setTimeout(() => {
        // Navigate to the Admin_dashboardComponent
        this.router.navigate(['/Admin_dashboardComponent']);
      }, 2000); // Delay navigation for 3 seconds
    }, 3000); // Adjust the timeout as needed
    // alert("card added")
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

  publishSubtopic(labelName: string) {
    this.dataService.publishSubtopic(labelName).subscribe(
      (response) => {
        console.log('Subtopic published successfully:', response);
        this.showPublishedMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['../Admin_dashboardComponent']);
        }, 3000); // Adjust the timeout as needed
        
      },
      (error) => {
        console.error('Error publishing subtopic:', error);
        // Handle error
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

  getFilePath(labelName: string, file: string): string {
    // Construct the full path of each file
    return `http://localhost:3000/uploads/${labelName}/${file}`; // Adjust the path as needed
  }
  
  }
  
 




//   newDataSubject = new Subject<any>();

//   recentData: any;
//   leftColumn: any[] = []; 
//   rightColumn: any[] = []; 

//   constructor(private dataService: DataService,) {}

//   ngOnInit(): void {
//     this.loadData();
//   }

//   loadData(): void {
//     this.dataService.getRecentData().subscribe(
//       (data: any[]) => {
//         console.log('Server Response:', data);
  
//         if (data.length > 0) {
//           this.recentData = data[0];
//           console.log('Recent Data:', this.recentData);
  
//           if (Array.isArray(this.recentData.files)) {
//             console.log('Files:', this.recentData.files);
//           } else {
//             console.log('Files property is missing or not an array.');
//           }
//         } else {
//           console.log('No recent data found.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching recent data:', error);
//       }
//     );
//   }
  
//   isImage(fileName: string): boolean {
//     return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
//   }

//   isVideo(fileName: string): boolean {
//     return /\.(mp4|webm|ogg)$/i.test(fileName);
//   }
//   getImagePreviewUrl(fileName: string): string {
//     return http://localhost:3000/uploads/${fileName};
//   }
  
//   getVideoPreviewUrl(fileName: string): string {
//     return http://localhost:3000/uploads/${fileName};
//   }
  
//   onSaveClick(): void {
//     const newData = { name: this.recentData.name, chosenOption: this.recentData.chosenOption };
  
//     const targetColumn = newData.chosenOption === 'iMedOne Knowledge' ? this.leftColumn : this.rightColumn;
//     targetColumn.push({ title: newData.name});
  
//       this.leftColumn = [...this.leftColumn];
//     this.rightColumn = [...this.rightColumn];
//   }
  

// }


