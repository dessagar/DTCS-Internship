import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PreviewService } from '../preview.service';
import { DataStorageService } from '../data-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { DataService } from '../data.service';



@Component({
  selector: 'app-admin-sub-section',
  templateUrl: './admin-sub-section.component.html',
  styleUrls: ['./admin-sub-section.component.scss']
})
export class AdminSubSectionComponent {
  labelName!: string;
  selectedSubject!: string;
  textareaContent!: string;
  subjects: string[] = [];
  isUpdate!: boolean;
  saveButtonText: string = "Save";
  showSuccessMessage: boolean = false;
  showUpdatedMessage: boolean = false;
  storedData: any = {};
  subsectionForm!: FormGroup;
  resetFormOnLoad: boolean = false;
  uploadedFiles: string[] = [];
  fileDescriptions: string[] = [];

  private apiUrl = 'http://localhost:3000'; // Adjust the API URL as per your backend configuration



  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute,private dataService: DataService,
    private previewService: PreviewService, private dataStorageService: DataStorageService,    private formBuilder: FormBuilder,
  ) {}

    ngOnInit(): void {
      this.initForm();

      this.route.queryParams.subscribe(params => {
        this.resetFormOnLoad = params['resetForm'] === 'true';
        if (this.resetFormOnLoad) {
          this.resetForm();
        }
      });
      // Retrieve stored form data from service
      const storedFormData = this.dataStorageService.formData;
    
      if (storedFormData) {
        // Populate form fields with stored data
        this.labelName = storedFormData.labelName;
        this.selectedSubject = storedFormData.selectedSubject;
        this.textareaContent = storedFormData.textareaContent;
        this.selectedFiles = storedFormData.selectedFiles;
        this.fileDescriptions = storedFormData.fileDescriptions || [];
      } else {
        // Fetch subjects from backend when component initializes
        this.fetchSubjects();
      }
    
      this.route.params.subscribe(params => {
        const action = params['action'];
        const labelName = params['labelName'];
    
        // Set isUpdate based on the action parameter
        this.isUpdate = action === 'create' ? true : false;
    
        // Fetch subtopic data regardless of action
        this.previewService.getSubtopicFormData(labelName).subscribe(data => {
          this.labelName = data.labelName;
          this.selectedSubject = data.selectedSubject;
          this.textareaContent = data.textareaContent;
          this.fileDescriptions = data.fileDescriptions || [];
        });
// Fetch recently uploaded filenames for the label name using DataService
this.dataService.getRecentlyUploadedFilenames(labelName).subscribe(files => {
  this.uploadedFiles = files;
}, error => {
  console.error('Error fetching uploaded files:', error);
});
});
    }
    
    initForm(): void {
      this.subsectionForm = this.formBuilder.group({
        labelName: ['', Validators.required],
        selectedSubject: ['', Validators.required],
        textareaContent: ['', Validators.required],
        fileDescriptions: ['', Validators.required],
        files: ['']
      });
    }
  
    resetForm(): void {
      this.subsectionForm.reset();
      
      console.log('Form reset successful');
    }
  
  
  fetchSubjects() {
    this.http.get<any>('http://localhost:3000/subjectform').subscribe(response => {
      this.subjects = response.map((formData: any) => formData.labelName);
    }, error => {
      console.error('Error fetching subjects:', error);
    });
  }

  selectedFiles: File[] = [];


  preview(): void {
    
    // Prepare form data
    const formData = {
      labelName: this.labelName,
      selectedSubject: this.selectedSubject,
      textareaContent: this.textareaContent,
      fileDescriptions: this.fileDescriptions || [],
    };
  console.log(formData)
    if (this.isUpdate) {
      // Send PUT request for updating existing subtopic
      this.http.put<any>(`http://localhost:3000/api/subtopicform/${this.labelName}/update`, formData)
        .subscribe(() => {
          console.log('Data updated successfully!');
          // Upload files before navigating to the preview page
          this.uploadFiles(formData).subscribe(() => {
            this.navigateToDataPreview(formData);
          });
        }, error => {
          console.error('Error updating data:', error);
          // Handle error
        });
    } else {
      // Check if the label name already exists in the database
      this.http.get<any>(`http://localhost:3000/api/subtopicform/${this.labelName}`).subscribe(
        () => {
          // Label name exists, navigate to data preview page
          console.log(`Label name '${this.labelName}' already exists in the database.`);
          // Upload files before navigating to the preview page
          this.uploadFiles(formData).subscribe(() => {
            this.navigateToDataPreview(formData);
          });
        },
        () => {
          // Label name does not exist, proceed with sending POST request
          console.log(`Label name '${this.labelName}' does not exist in the database. Proceeding with data submission.`);
          // Send POST request to create new subtopic
          this.http.post<any>('http://localhost:3000/api/subtopicform', formData).subscribe(() => {
            console.log('Data saved successfully!');
            // Upload files before navigating to the preview page
            this.uploadFiles(formData).subscribe(() => {
              this.navigateToDataPreview(formData);
            });
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
      );
    }
  }
  
  
  private navigateToDataPreview(formData: any): void {
    this.router.navigate(['/datapreview'], {
      queryParams: {
        labelName: formData.labelName,
        selectedSubject: formData.selectedSubject,
        textareaContent: formData.textareaContent,
        fileDescriptions: formData.fileDescriptions || [],
        storedData: formData // Pass recent data here

      }
    });
  }
  
  
  
  onSave(): void {
    // Prepare form data
    const formData = {
      labelName: this.labelName,
      selectedSubject: this.selectedSubject,
      textareaContent: this.textareaContent,
      fileDescriptions: this.fileDescriptions || [],
    };
  
    if (this.isUpdate) {
      // Send PUT request for updating existing subtopic
      
      this.http.put<any>(`http://localhost:3000/api/subtopicform/${this.labelName}/update`, formData)
        .subscribe(response => {
          this.saveButtonText = "Update";
          console.log('Data updated successfully!', response);
          this.saveButtonText = "Updated";
          this.showUpdatedMessage = true;
          setTimeout(() => {
            this.showUpdatedMessage = false;
            this.router.navigate(['../Admin_dashboardComponent']);
          }, 2000); // Adjust the timeout as needed
        }, error => {
          console.error('Error updating data:', error);
          // Handle error
        });
    } else {
      // Send POST request for creating new subtopic
      this.http.post<any>('http://localhost:3000/api/subtopicform', formData)
        .subscribe(response => {
          console.log('Data saved successfully!', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['../Admin_dashboardComponent']);
          }, 2000); // Adjust the timeout as needed

  
        }, error => {
          console.error('Error saving data:', error);
          alert('Error saving data!');
        });
        
    }
    this.resetForm();

  }
  

  uploadFiles(formData: any): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('labelName', formData.labelName); // Include labelName in the FormData
  
    this.selectedFiles.forEach(file => {
      uploadData.append('files', file);
    });
  
    // Log the filenames before uploading
    this.selectedFiles.forEach(file => {
      console.log('Uploading file:', file.name);
    });
  
    // Return the HTTP POST request
    return this.http.post('http://localhost:3000/upload-multiple-files', uploadData);
  }
 

 
  onFileSelected(event: any): void {
    const files: FileList | null = event.target.files;
    if (files !== null) {
      // Append the newly selected files to the existing array
      this.selectedFiles = this.selectedFiles.concat(Array.from(files));
    }
  }
  


  // Function to get the file type based on the file extension
  getFileType(file: File): string {
    return file.type.split('/')[1].toUpperCase();
  }
  previewFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
  
    // Upload the file to the server
    this.http.post('http://localhost:3000/upload-file', formData)
      .subscribe((response) => {
        // Handle the response from the backend (if needed)
        console.log('File uploaded successfully:', response);
        
      // After the file is uploaded, store form data in service
this.dataStorageService.formData = {
  labelName: this.labelName,
  selectedSubject: this.selectedSubject,
  textareaContent: this.textareaContent,
  selectedFiles: this.selectedFiles,
  fileDescriptions: this.fileDescriptions || [],
};

// Navigate to the "preview" page
this.router.navigate(['/preview', file.name]);

      });
  }
  
  deleteFile(file: File | string): void {
    if (typeof file === 'string') {
      // Extract labelName from the form
      const labelName = this.labelName;
      
      // Delete the file from the backend folder
      this.deleteFileFromServer(labelName, file);
       // Remove the file from the uploadedFiles array
    const uploadedIndex = this.uploadedFiles.indexOf(file);
    if (uploadedIndex !== -1) {
      this.uploadedFiles.splice(uploadedIndex, 1);
    }
    } else {
      // Delete the file from the selectedFiles array
      const index = this.selectedFiles.indexOf(file);
      if (index !== -1) {
        this.selectedFiles.splice(index, 1);
      }
    }
  }
  
  deleteFileFromServer(labelName: string, fileName: string): void {
    // Send a DELETE request to your backend API to delete the file
    this.http.delete(`http://localhost:3000/deleteFile?labelName=${labelName}&fileName=${fileName}`)
      .subscribe(
        () => {
          console.log('File deleted from server:', fileName);
          // Perform any additional logic needed after successful deletion
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting file from server:', error);
          // Handle error
        }
      );
      
  }
  




}


    // storeAndNavigateToPreview() {
    //   // Upload files first
    //   this.uploadFiles().subscribe(
    //     (uploadResponse) => {
    //       // Upload successful, now store other data
    //       const dataToStore = {
    //         name: this.labelName,
    //         eligibility: this.selectedEligibility,
    //         chosenOption: this.selectedItem,
    //         textareaContent: this.textareaContent,
    //         files: uploadResponse.files,
    //         // Add other properties as needed
    //       };
    
    //       // Combine the upload and store observables using forkJoin
    //       forkJoin([
    //         this.dataService.storeData(dataToStore),
    //         // Add other observables if needed
    //       ]).subscribe(
    //         ([storeResponse]) => {
    //           console.log('Data stored successfully:', storeResponse);
    //           // After storing data and uploading files, navigate to the preview page
    //           this.router.navigate(['/datapreview']);
    //         },
    //         (error) => {
    //           console.error('Error storing data:', error);
    //           // Handle store error as needed
    //         }
    //       );
    //     },
    //     (uploadError) => {
    //       console.error('Error uploading files:', uploadError);
    //       // Handle upload error as needed
    //     }
    //   );
    // }
    
    
    
