import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  constructor(private http: HttpClient) {}

  getStoredData(): Observable<any[]>{
    return this.http.get<any>('http://localhost:3000/api/subtopicform/latest');
  }

 // Method to fetch data for a specific subject based on labelName
 getSubjectData(labelName: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3000/subjectform/${labelName}`);
}

 // Method to fetch subtopics based on the subject name
 getSubtopicsBySubject(subjectName: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3000/api/subtopicform?selectedSubject=${subjectName}`);
}
  // Method to fetch subtopics based on the selected subject
  gettopicsBySubject(selectedSubject: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/subtopicform?selectedSubject=${selectedSubject}`);
  }

   // Method to fetch subtopic data based on labelName
   getSubtopicByLabelName(labelName: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/subtopicform/${labelName}`);
  }
  getSubtopicFormData(labelName: string, action: string = ''): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/subtopicform/${labelName}?action=${action}`);
  }
  
  updateSubtopicFormData(labelName: string, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/subtopicform/${labelName}/update`, data);
  }

  publishSubtopic(subtopicId: string): Observable<any> {
    return this.http.put(`http://localhost:3000/publish-subtopic/${subtopicId}`, {});
  }
}
