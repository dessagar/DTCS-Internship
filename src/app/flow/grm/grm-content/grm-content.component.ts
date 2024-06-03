// Import necessary modules and services 
import { Component, OnInit } from '@angular/core';
import { CreateSlideService } from 'src/app/create-slide/create-slide.service';
import { GrmContentService } from './grm-content.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-grm-content',
  templateUrl: './grm-content.component.html',
  styleUrls: ['./grm-content.component.scss']
})
export class GrmContentComponent  {

  constructor(
    private route: ActivatedRoute,
    private createSlideService: CreateSlideService,
    private grmContentService: GrmContentService
  ) {
    this.grmContentService.getReloadObservable().subscribe(() => {
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
    this.slides = existingSlides.filter(slide => slide.selectedModules.includes('GRM'));
  });
}
activeTab: string = 'local';  

// Method to set the active tab
setActiveTab(tab: string): void {
  this.activeTab = tab;
}
}