import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private savedContentSubject = new BehaviorSubject<SafeHtml>('');
  savedContent$: Observable<SafeHtml> = this.savedContentSubject.asObservable();

  saveContent(content: string) {
    console.log('Saved Content:', content);
    this.savedContentSubject.next(content);
  }
  
}