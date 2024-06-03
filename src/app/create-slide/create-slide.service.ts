// create-slide.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { PmsContentService } from '../flow/pms/pms-content/pms-content.service';
import { LsmContentService } from '../flow/lsm/lsm-content/lsm-content.service';
import { CareContentService } from '../flow/care/care-content/care-content.service';
import { GrmContentService } from '../flow/grm/grm-content/grm-content.service';
import { AmsContentService } from '../flow/ams/ams-content/ams-content.service';
import { BillingContentService } from '../flow/billing/billing-content/billing-content.service';
import { DocopContentService } from '../flow/docop/docop-content/docop-content.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CreateSlideService {
  
  private apiUrl = 'http://localhost:3000'; 
  private slidesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient,
    private pmsContentService: PmsContentService,
    private lsmContentService: LsmContentService,
    private careContentService: CareContentService,
    private grmContentService: GrmContentService,
    private billingContentService: BillingContentService,
    private docopContentService: DocopContentService,
    private amsContentService: AmsContentService,
    private sharedService : SharedService,
    private router: Router) {}

  // Remove the local slides array
  // private slides: any[] = [];

  // Modify getSlides to make an HTTP GET request

  addSlide(slide: any) {
    return this.http.post(`${this.apiUrl}/slides`, slide);
  }


  getSlides() {
    return this.http.get<any[]>(`${this.apiUrl}/slides`);
  }
  getSlideValues() {
    return this.http.get(`${this.apiUrl}/slide-values`);
  }

  setSlideValues(values: any) {
    // You can implement an HTTP PUT request to update values on the server if needed
    console.log('Setting slide values:', values);
  }

  addSlideToModules(newSlide: any, selectedModule: string) {
    // Add logic to broadcast the selected slide to the appropriate module's service
    switch(selectedModule) {
      case 'PMS':
        this.pmsContentService.addSlide(newSlide);
        break;
      case 'CARE':
        this.careContentService.addSlide(newSlide);
        break;
      case 'GRM':
        this.grmContentService.addSlide(newSlide);
        break;
      case 'LSM':
        this.lsmContentService.addSlide(newSlide);
        break;
      case 'AMS':
        this.amsContentService.addSlide(newSlide);
        break;  
      case 'BILLING':
        this.billingContentService.addSlide(newSlide);
        break;
      case 'DOCOP':
         this.docopContentService.addSlide(newSlide);
            break;      
      default:
        console.error('Invalid module:', selectedModule);
        break;
    }
  }
  getSlidesByModule(module: string): Observable<any[]> {
    console.log(module)
    return this.http.get<any[]>(`${this.apiUrl}/slides/module/${module}`);
  }
  
  
  
  getAllSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slides`);
  }
  
   // In CreateSlideService
   deleteSlide(slideId: string): Observable<void> {
    const url = `${this.apiUrl}/slides/${slideId}`; // Update the URL with the correct endpoint
    return this.http.delete<void>(url);
  }
  updateSlide(slideId: string, updatedSlide: any): Observable<any> {
    const url = `${this.apiUrl}/slides/${slideId}`;
    return this.http.put(url, updatedSlide);
  }

  uploadInternalVideo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', file);
  
    return this.http.post(`${this.apiUrl}/upload-video`, formData);
  }
 

  
}