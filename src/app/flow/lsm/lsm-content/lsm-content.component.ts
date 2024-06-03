import { Component } from '@angular/core';
import { CreateSlideService } from 'src/app/create-slide/create-slide.service';
import { LsmContentService } from './lsm-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lsm-content',
  templateUrl: './lsm-content.component.html',
  styleUrls: ['./lsm-content.component.scss']
})
export class LsmContentComponent {
  constructor(
    private route: ActivatedRoute,
    private createSlideService: CreateSlideService,
    private lsmContentService: LsmContentService
    ) {this.lsmContentService.getReloadObservable().subscribe(() => {
      this.loadSlides();
    });
  }

  slides: any[] = [];

  role: string = ''; // Variable to store the role information

ngOnInit() {
  this.loadSlides();
   // Extract role from query parameters
   this.route.queryParams.subscribe(params => {
    this.role = params['role'];
  });

}


loadSlides() {
  this.createSlideService.getSlides().subscribe((existingSlides: any[]) => {
    // Filter slides to include only those related to the PMS module
    this.slides = existingSlides.filter(slide => slide.selectedModules.includes('LSM'));
  });
}

  
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
    modalId: 'patientAssesment',
    modalTarget: '#patientAssesment'
  };

  activeTab: string = 'local';  

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

  // Method to set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}