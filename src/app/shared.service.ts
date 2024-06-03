// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private newDataSubject = new BehaviorSubject<any>(null);
  newData$ = this.newDataSubject.asObservable();

  setNewData(data: any): void {
    this.newDataSubject.next(data);
  }
}
