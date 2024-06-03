// edit-mode.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditModeService {
  private isEditModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isEditMode$: Observable<boolean> = this.isEditModeSubject.asObservable();

  constructor() {}

  setEditMode(isEditMode: boolean): void {
    this.isEditModeSubject.next(isEditMode);
  }
}
