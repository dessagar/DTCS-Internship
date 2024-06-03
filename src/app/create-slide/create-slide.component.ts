// create-slide.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { CreateSlideService } from '../create-slide/create-slide.service';
import { PmsContentService } from '../flow/pms/pms-content/pms-content.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { LsmContentService } from '../flow/lsm/lsm-content/lsm-content.service';
import { ActivatedRoute } from '@angular/router';


import 'bootstrap/dist/js/bootstrap.bundle.min.js';

@Component({
  selector: 'app-create-slide',
  templateUrl: './create-slide.component.html',
  styleUrls: ['./create-slide.component.scss']
})
export class CreateSlideComponent implements OnInit {
  serverBaseUrl = 'http://localhost:3000'; // Update this with your server's base URL

  slideForm!: FormGroup;
  slides: any[] = [];
  selectedImageFile: File | null = null;
  imageSrc: string = ''; // Variable to store the image source
  videoSrc: string = '';
  slideDeleted = false;

  modules: string[] = ['PMS', 'CARE', 'GRM', 'LSM', 'AMS','BILLING','DOCOP'];
  moduleControls: { [key: string]: FormControl } = {};

  externalVideos!: FormArray;
  internalVideos!: FormArray;
  isExternal: boolean = true;
  slideSuccess = false;

  // Add editing state variables
  isEditing = false;
  editingSlideId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private createSlideService: CreateSlideService,
    private pmsContentService: PmsContentService,
    private lsmContentService: LsmContentService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private http: HttpClient // Inject the HttpClient service
  ) {
    this.modules.forEach((module) => {
      this.moduleControls[module] = new FormControl(false);
    });

    this.externalVideos = this.fb.array([]);
    this.internalVideos = this.fb.array([]);
  }
  ngOnInit() {
    // Initialize module controls for the radio buttons
    this.modules.forEach((module) => {
      this.moduleControls[module] = new FormControl(false);
    });
  
    // Initialize the slide form including the selectedModule control
    this.slideForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      description: [''],
      image: [''],
      selectedModule: [''], // Add selectedModule control
      externalVideos: this.externalVideos,
      internalVideos: this.internalVideos,
    });
  // Check if the 'module' query parameter exists in the URL
  this.route.queryParams.subscribe(params => {
    const selectedModule = params['module'];
    if (selectedModule && this.modules.includes(selectedModule.toUpperCase())) {
      // If the selected module exists in the modules array, set it as selected
      this.slideForm.get('selectedModule')?.setValue(selectedModule.toUpperCase());
      // Fetch slides for the selected module
      this.createSlideService.getSlidesByModule(selectedModule).subscribe((slides: any[]) => {
        // Update the slides array with the fetched slides
        console.log('hey+++++');
        this.slides = slides;
      });
    }
  });
  // Check if the 'module' query parameter exists in the URL
  this.route.queryParams.subscribe(params => {
    const selectedModule = params['module'];
    if (selectedModule) {
      // If the selected module exists in the query parameters, fetch slides for that module
      this.fetchSlides(selectedModule.toUpperCase());
    }
  });
    // Reset module controls
    this.modules.forEach((module) => {
      this.moduleControls[module].reset(false);
    });
  }
  fetchSlides(module: string | null) {
    // Check if module is provided
    if (module) {
      // Call the service method to fetch slides by module
      this.createSlideService.getSlidesByModule(module).subscribe((slides: any[]) => {
        console.log('Fetched slides:', slides); // Log the fetched slides
    console.log('Number of slides:', slides.length); // Log the length of the slides array
        // Update the slides array with the fetched slides
        this.slides = slides;
      });
    } else {
      // Call the service method to fetch all slides
      this.createSlideService.getAllSlides().subscribe((slides: any[]) => {
        // Update the slides array with the fetched slides
        console.log('Fetched slides:', slides); // Log the fetched slides

        this.slides = slides;
      });
    }
  }
  
  
  
  selectModule(module: string) {
    this.slideForm.get('selectedModule')?.setValue(module);
    // Fetch slides for the selected module
    this.createSlideService.getSlidesByModule(module).subscribe((slides: any[]) => {
      // Update the slides array with the fetched slides
      console.log(slides)
      this.slides = slides;
    });
  }
  
  
  get videoControls(): AbstractControl[] {
    return this.isExternal ? this.externalVideos.controls : this.internalVideos.controls;
  }

  addExternalVideo() {
    this.externalVideos.push(
      this.fb.group({
        videoTitle: ['', Validators.required],
        videoDescription: [''],
        youtubeUrl: ['', Validators.pattern('^(https?\\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$')],
      })
    );
  }

  addInternalVideo() {
    this.internalVideos.push(
      this.fb.group({
        videoTitle: ['', Validators.required],
        videoDescription: [''],
        localVideoFile: [''],
      })
    );
  }

  removeVideo(videoType: string, index: number) {
    const videos = videoType === 'externalVideos' ? this.externalVideos : this.internalVideos;
    videos.removeAt(index);
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
  
    if (file) {
      this.slideForm.patchValue({
        image: file.name,
      });
  
      // Upload the image file to the server
      this.uploadImage(file);
    }
  }
  onDeleteImageClick(filename: string) {
    // Reset the value of the image form control
    this.slideForm.patchValue({
      image: null,
  });
    this.http.delete(`http://localhost:3000/deleteImage/${filename}`)
      .subscribe(
        () => {
          console.log('Image deleted successfully:', filename);
          // Handle success (e.g., update UI)
        },
        (error) => {
          console.error('Error deleting image:', error);
          // Handle error
        }
      );
  }
  

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    this.http.post(`${this.serverBaseUrl}/upload`, formData).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully:', response.filename);
  
        // Update imageSrc property for immediate display in the carousel
        this.imageSrc = this.getImageUrl(response.filename);
  
        // Use imageUrl as needed, for example, save it in your form or display it in your component
      },
      (error) => {
        console.error('Error uploading image:', error);
        // Handle the error appropriately
      }
    );
  }
  
  getImageUrl(image: string | null): string {
    if (!image) {
      return 'image not found';
    }
    return `${this.serverBaseUrl}/${image}`;
  }
  
  
//local
  onVideoChange(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
  
    if (file) {
      // Call the method to upload the video file to the server
      this.uploadVideo(file, index);
    }
  }
 //local 
  uploadVideo(file: File, index: number) {
    const formData = new FormData();
    formData.append('video', file);
  
    this.http.post(`${this.serverBaseUrl}/upload-video`, formData).subscribe(
      (response: any) => {
        console.log('Video uploaded successfully:', response.filename);
  
        // Update the videoSrc property for immediate display in the carousel
        this.videoSrc = this.getVideoUrl(response.filename);
  
        // Update the video file in the internalVideos array
        const videoControl = this.internalVideos.at(index).get('localVideoFile');
        if (videoControl) {
          videoControl.setValue(response.filename);
        }
      },
      (error) => {
        console.error('Error uploading video:', error);
        // Handle the error appropriately
      }
    );
  }
  
  getVideoUrl(video: string | null): string {
    if (!video) {
      return 'video not found';
    }
    return `${this.serverBaseUrl}/${video}`;
  }
  
  clearVideos() {
    const videosArray = this.isExternal ? this.externalVideos : this.internalVideos;
    while (videosArray.length !== 0) {
      videosArray.removeAt(0);
    }
  }

  onSubmit(): void {
    console.log('Form submitted!');

    if (this.slideForm.valid) {
      // Get the selected module from the form control
      const selectedModule = this.slideForm.get('selectedModule')?.value;
  
      if (selectedModule) { // Check if a module is selected
        // Proceed with adding or updating the slide
        // Call the service method to add slide to modules
        this.createSlideService.addSlideToModules(this.slideForm.value, selectedModule);

      for (let i = 0; i < this.externalVideos.length; i++) {
        const youtubeUrl = this.externalVideos.at(i).get('youtubeUrl')?.value;

        if (!youtubeUrl) {
          // Handle the case where YouTube URL is undefined
          console.error('YouTube URL is undefined for external video at index', i);
          // Optionally, you can break out of the loop or perform additional handling
        } else {
          // Process the YouTube URL
          console.log('Processing YouTube URL:', youtubeUrl);
        }
      }
        if (this.isEditing && this.editingSlideId) {
          // Editing an existing slide
          const updatedSlide = {
            ...this.slideForm.value,
            selectedModules: selectedModule,
          };
  
          console.log('Editing Slide ID:', this.editingSlideId);
          console.log('Updated Slide Data:', updatedSlide);
  
          this.createSlideService.updateSlide(this.editingSlideId, updatedSlide).subscribe(
            response => {
              console.log('Slide updated successfully:', response);
     
              // Optionally, reset form or perform other actions
              this.resetForm();
              this.isEditing = false; // Set editing flag to false after resetting the form

              this.clearVideos();
  
              this.slideSuccess = true;
              this.editingSlideId = null;
  
              setTimeout(() => {
                this.slideSuccess = false;
              }, 2000);
            },
            error => {
              console.error('Error updating slide:', error);
              // Handle the error appropriately
            }
          );
        } else {
          // Creating a new slide
          const newSlide = {
            ...this.slideForm.value,
            selectedModules: selectedModule,
          };
  
          this.createSlideService.addSlideToModules(newSlide, selectedModule);
        
          // Optionally, reset form or perform other actions
          this.resetForm();
          this.clearVideos();
        
          this.slideSuccess = true;
        
          setTimeout(() => {
            this.slideSuccess = false;
          }, 2000);
        }
        
      }
    }
  }
  
  resetForm() {
    this.slideForm.reset();
    this.selectedImageFile = null;
  }

showSlideDetails(slide: any) {
  // Logic to show the details of the selected slide
  console.log('Selected Slide:', slide);
  // You can add code to display the slide details in a modal or another section
}
deleteSlide(slideId: string, index: number) {
  // Make the API call to delete the slide from the database
  this.createSlideService.deleteSlide(slideId).subscribe(
    () => {
      console.log('Slide deleted successfully.');

      this.slideDeleted = true;
      setTimeout(() => {
        this.slideDeleted = false;
      }, 2000)
      // Remove the slide from addedSlides

      // Update the local storage
    },
    (error) => {
      console.error('Error deleting slide:', error);
      // Handle the error appropriately
    }
  );
}
onSlideTitleClick(slide: any) {
  this.isEditing = true; // Set the editing flag to true
  this.editingSlideId = slide._id; // Store the ID of the slide being edited

  // Populate the form with the selected slide data
  this.slideForm.patchValue({
    title: slide.title,
    subtitle: slide.subtitle,
    description: slide.description,
    image: slide.image || null,
    // ... other form controls
  });

  // Populate externalVideos
  this.clearVideos();
  slide.externalVideos.forEach((externalVideo: any) => {
    this.addExternalVideo();
    const externalVideoForm = this.externalVideos.at(this.externalVideos.length - 1);
    externalVideoForm.patchValue(externalVideo);
  });

  // Populate internalVideos
  slide.internalVideos.forEach((internalVideo: any) => {
    this.addInternalVideo();
    const internalVideoForm = this.internalVideos.at(this.internalVideos.length - 1);
    internalVideoForm.patchValue(internalVideo);
  });

  // Optionally, update the selectedModules checkboxes based on the slide data
  this.modules.forEach((module) => {
    this.moduleControls[module].setValue(slide.selectedModules.includes(module));
  });
  this.cdRef.detectChanges();
}
}
// Populate internalVideos
// slide.internalVideos.forEach((internalVideo: any) => {
//   this.addInternalVideo();
//   const internalVideoForm = this.internalVideos.at(this.internalVideos.length - 1);

//   internalVideoForm.patchValue({
//     videoTitle: internalVideo.videoTitle || '',  
//     videoDescription: internalVideo.videoDescription || '',
//     localVideoFile: '',  
//   });
// });
