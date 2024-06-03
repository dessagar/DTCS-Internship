// pms-content.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// pms-content.service.ts
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PmsContentService {
  private slides: any[] = []; // Declare the slides property here
  private apiUrl = 'http://localhost:3000'; // Adjust the API URL as needed

  private reloadSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  triggerReload(): void {
    this.reloadSubject.next();
  }

  getReloadObservable(): Observable<void> {
    return this.reloadSubject.asObservable();
  }
  addSlide(newSlide: any) {
    console.log('Adding slide to PMS:', newSlide);
    // Make the HTTP POST request to add the slide
    this.http.post(`${this.apiUrl}/slides`, newSlide).subscribe(
      (response: any) => {
        console.log('Slide added successfully:', response);
        // Add the new slide to the slides array
        this.slides.push(response);
      },
      error => {
        console.error('Error adding slide:', error);
        // Handle the error appropriately
      }
    );
  }
}
