// Import necessary modules and services 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SliderService } from './slider.service';
import { NewslideserviceService } from '../newslider/newslideservice.service';
@Component({
  selector: 'app-slidercontent',
  templateUrl: './slidercontent.component.html',
  styleUrls: ['./slidercontent.component.scss']
})
export class SlidercontentComponent {
  leftColumn: any[] = [];
  labelName: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newslide : NewslideserviceService,
    private SliderService: SliderService
  ) {
    this.SliderService.getReloadObservable().subscribe(() => {
      this.loadSlides();
    });
  }


  slides: any[] = [];
  role: string = ''; // Variable to store the role information

  ngOnInit() {
    // Extract role from query parameters
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
    });
  
    // Extract the labelName from the URL when the component initializes
    this.route.paramMap.subscribe(params => {
      this.labelName = params.get('labelName');
      console.log(this.labelName); // Log here to ensure it's properly updated
      this.loadSlides(); // Call loadSlides() after labelName is updated
    });
  }
  
goToNewSlider() {
  if (this.labelName) {
    this.router.navigate(['/newslider', this.labelName]);
  } else {
    console.error('No labelName found in URL');
  }
}
// loadSlides() {
//   this.newslide.getSlides().subscribe((existingSlides: any[]) => {
//     this.slides = existingSlides;
//   });
// }
loadSlides() {
  if (this.labelName) {
    console.log('URL Labelname:', this.labelName);

    this.newslide.getSlidesByLabelName(this.labelName).subscribe((slides: any[]) => {
      console.log('Retrieved slides:', slides);
      
      this.slides = slides;
    });
  }
}





// loadSlides() {
//   this.createSlideService.getSlides().subscribe((existingSlides: any[]) => {
//     // Filter slides to include only those related to the PMS module
//     const pmsSlides = existingSlides.filter(slide => slide.selectedModule === 'PMS');
//     this.slides = pmsSlides;
//   });
// }
 
  // Define content data
  contentData = {
    title: '1Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };

  contentData1 = {
    title: '2Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };
  contentData3 = {
    title: '3Inpatient : Patient is Admitted',
    subTitle: 'Ward nurse assesses the patient at bed',
    performer: 'Ward Nurse',
    imageSrc: '../../../../assets/iMedOne-Flow/Patient Assessment at Ward.jpg',
  };


  videoData: any[] = [
    { title: 'Video 1', text: 'Some quick example text for Video 1.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
    { title: 'Video 2', text: 'Some quick example text for Video 2.', source: 'https://www.youtube.com/embed/G36GbmO0AYg' },
    { title: 'Video 3', text: 'Some quick example text for Video 3.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
    { title: 'Video 4', text: 'Some quick example text for Video 4.', source: 'https://www.youtube.com/embed/dXOF6I7PwOU' },
  ];

  // localData: any[] = [
  //   { title: 'Local Video 1', text: 'Some quick example text for Local Video 1.' , source: 'assets/videos/iMedOnePms.mp4'},
  //   { title: 'Local Video 2', text: 'Some quick example text for Local Video 2.' , source: 'assets/videos/iMedOnePms.mp4' },
  //   { title: 'Local Video 3', text: 'Some quick example text for Local Video 3.' , source: 'assets/videos/iMedOnePms.mp4' },
  //   { title: 'Local Video 3', text: 'Some quick example text for Local Video 3.' , source: 'assets/videos/iMedOnePms.mp4' }
  // ];
  activeTab: string = 'local';  

  // Method to set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
