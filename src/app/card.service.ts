// card.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  constructor(private http: HttpClient) {}

  fetchTitleAndDescription(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/get-title-description');
  }

  deleteTitleDescription(itemId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/delete-title-description/${itemId}`);
  }
}
