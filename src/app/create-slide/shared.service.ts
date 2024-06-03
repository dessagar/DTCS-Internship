import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Create separate BehaviorSubjects for each module
  private pmsSlideSubject = new BehaviorSubject<any>(null);
  private lsmSlideSubject = new BehaviorSubject<any>(null);
  private grmSlideSubject = new BehaviorSubject<any>(null);

  // Create separate observables for each module
  pmsSlide$ = this.pmsSlideSubject.asObservable();
  lsmSlide$ = this.lsmSlideSubject.asObservable();
  grmSlide$ = this.grmSlideSubject.asObservable();

  constructor() {}

  setPmsSlide(slide: any) {
    console.log('Setting PMS slide:', slide);
    this.pmsSlideSubject.next(slide);
  }
  
  setLsmSlide(slide: any) {
    console.log('Setting LSM slide:', slide);
    this.lsmSlideSubject.next(slide);
  }
  
  setGrmSlide(slide: any) {
    console.log('Setting GRM slide:', slide);
    this.grmSlideSubject.next(slide);
  }
  
}
