import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewslideserviceService } from './newslideservice.service';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

@Component({
  selector: 'app-newslider',
  templateUrl: './newslider.component.html',
  styleUrls: ['./newslider.component.scss']
})
export class NewsliderComponent implements OnInit {

  serverBaseUrl = 'http://localhost:3000'; // Update this with your server's base URL

  slideForm!: FormGroup;
  slides: any[] = [];
  selectedImageFile: File | null = null;
  imageSrc: string = ''; // Variable to store the image source
  videoSrc: string = '';
  slideDeleted = false;

  externalVideos!: FormArray;
  internalVideos!: FormArray;
  isExternal: boolean = true;
  slideSuccess = false;

  // Add editing state variables
  isEditing = false;
  editingSlideId: string | null = null;
  lName: string | null = null;

  constructor(
    private newslide: NewslideserviceService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient // Inject the HttpClient service
  ) {
    this.externalVideos = this.fb.array([]);
    this.internalVideos = this.fb.array([]);
  }

  ngOnInit() {
    // Extract the labelName from the URL when the component initializes
    this.route.paramMap.subscribe(params => {
      this.lName = params.get('labelName');
      console.log('extracted ', this.lName); // Log here to ensure it's properly updated
      
    });
    
    // Initialize the slide form including the selectedModule control
    this.slideForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      description: [''],
      image: [''],
      externalVideos: this.externalVideos,
      internalVideos: this.internalVideos,
    });

    // Load slides
    this.loadSlides();
  }

  loadSlides() {
    this.newslide.getSlides().subscribe((existingSlides: any[]) => {
      // Directly assign the existing slides to this.slides without filtering
      this.slides = existingSlides;
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
    
    // Add the labelname to the form value
    const formData = {
      ...this.slideForm.value,
      labelname: this.lName,
    };
// Check if labelname is available

    if (this.isEditing && this.editingSlideId) {
      // Editing an existing slide
      const updatedSlide = {
        ...formData
      };

      console.log('Editing Slide ID:', this.editingSlideId);
      console.log('Updated Slide Data:', updatedSlide);

      this.newslide.updateSlide(this.editingSlideId, updatedSlide).subscribe(
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
        ...formData
      };

      this.newslide.addSlideToModules(newSlide);

      // Optionally, reset form or perform other actions
      this.resetForm();
      this.clearVideos();

      this.slideSuccess = true;

      setTimeout(() => {
        this.slideSuccess = false;
      }, 2000);
    }
  }

  showSlideDetails(slide: any) {
    // Logic to show the details of the selected slide
    console.log('Selected Slide:', slide);
    // You can add code to display the slide details in a modal or another section
  }

  deleteSlide(slideId: string, index: number) {
    // Make the API call to delete the slide from the database
    this.newslide.deleteSlide(slideId).subscribe(
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

  resetForm() {
    this.slideForm.reset();
    this.selectedImageFile = null;
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

    this.cdRef.detectChanges();
  }
}
