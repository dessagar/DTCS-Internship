// chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AskmeService {
  private apiUrl = 'http://localhost:3000'; // Update with your server URL

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions`);
  }

  askQuestion(question: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/questions`, { text: question });
  }

  replyToQuestion(questionId: string, answer: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/questions/${questionId}/reply`, { answer });
  }

  addAnswers(questionId: string, answers: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/questions/${questionId}/answers`, { answers });
  }

  postAnswers(questionId: string, answers: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/questions/${questionId}/answers`, { answers });
  }

 

  
}
