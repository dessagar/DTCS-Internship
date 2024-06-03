// create-slide.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SliderService } from '../slidercontent/slider.service';
@Injectable({
  providedIn: 'root'
})
export class NewslideserviceService {
  private apiUrl = 'http://localhost:3000'; 
  private slidesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient,
   private slideservice : SliderService
    ) {}

  // Remove the local slides array
  // private slides: any[] = [];

  // Modify getSlides to make an HTTP GET request

  addSlide(slide: any) {
    return this.http.post(`${this.apiUrl}/slides`, slide);
  }


  getSlides() {
    return this.http.get<any[]>(`${this.apiUrl}/slides`);
  }
  
  
  getSlidesByLabelName(labelname: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slides/labelname/${labelname}`);
  }
  getSlideValues() {
    return this.http.get(`${this.apiUrl}/slide-values`);
  }

  setSlideValues(values: any) {
    // You can implement an HTTP PUT request to update values on the server if needed
    console.log('Setting slide values:', values);
  }

  addSlideToModules(newSlide: any) {
           this.slideservice.addSlide(newSlide);

   
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
