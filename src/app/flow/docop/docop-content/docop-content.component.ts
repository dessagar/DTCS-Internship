// Import necessary modules and services 
import { Component, OnInit } from '@angular/core';
import { CreateSlideService } from 'src/app/create-slide/create-slide.service';
import { DocopContentService } from './docop-content.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-docop-content',
  templateUrl: './docop-content.component.html',
  styleUrls: ['./docop-content.component.scss']
})
export class DocopContentComponent  {

  constructor(
    private route: ActivatedRoute,
    private createSlideService: CreateSlideService,
    private docopContentService: DocopContentService
  ) {
    this.docopContentService.getReloadObservable().subscribe(() => {
      this.loadSlides();
    });
  }
  activeTab: string = 'local';  

  // Method to set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
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
    this.slides = existingSlides.filter(slide => slide.selectedModules.includes('DOCOP'));
  });
}
}