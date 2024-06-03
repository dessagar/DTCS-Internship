import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Adjust the API URL as per your backend configuration

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-multiple-files`, formData);
  }

 // Function to fetch recently uploaded filenames based on labelName
 getRecentlyUploadedFilenames(labelName: string): Observable<string[]> {
  const url = `${this.apiUrl}/recentlyUploadedFilenames?labelName=${labelName}`;
  return this.http.get<string[]>(url);
}


publishSubtopic(labelName: string): Observable<any> {
  const url = `${this.apiUrl}/publishSubtopic/${labelName}`;
  return this.http.put<any>(url, {}).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle errors
      console.error('Error publishing subtopic:', error);
      let errorMessage = 'An error occurred while publishing the subtopic.';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Server-side error: ${error.status} - ${error.error.message}`;
      }
      return throwError(errorMessage);
    })
  );
}

}
