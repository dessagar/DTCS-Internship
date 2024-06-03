// file.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFileContent(filename: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.baseUrl}/uploads/default/${filename}`, { responseType: 'arraybuffer' });
    
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload-file`, formData);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getFileTypeFromFilename(filename: string): string {
    // Add your logic to determine file type based on filename here
    // For example, you can use regex or file extensions
    return ''; // Replace with actual logic
  }
}
