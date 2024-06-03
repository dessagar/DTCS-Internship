import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';  // Import SafeUrl

@Component({
  selector: 'app-admin-preview',
  templateUrl: './admin-preview.component.html',
  styleUrls: ['./admin-preview.component.scss']
})
export class AdminPreviewComponent implements OnInit {
  filename: string = '';
  fileContent: ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.filename = this.route.snapshot.paramMap.get('filename') || '';

    this.fileService.getFileContent(this.filename).subscribe(
      (content: ArrayBuffer) => {
        this.fileContent = content;
      },
      (error: any) => {
        console.error('Error fetching file content:', error);
      }
    );
  }

  // Convert the ArrayBuffer to a SafeUrl
  get safeFileContent(): SafeUrl | null {
    if (this.fileContent) {
      const blob = new Blob([this.fileContent], { type: 'application/octet-stream' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }
    return null;
  }


  selectedFiles: File[] = [];

// Method to handle file selection
onFileSelected(event: any): void {
  const files: FileList = event.target.files;
  // Append the newly selected files to the existing array
  this.selectedFiles = this.selectedFiles.concat(Array.from(files));
}
get isImage(): boolean {
  return this.getFileTypeFromFilename(this.filename) === 'image';
}

// Function to get the file type based on the file extension
getFileTypeFromFilename(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  // Check for common image and video extensions
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
    return 'image';
  } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
    return 'video';
  } else {
    return '';
  }
}
 // Function to preview a file (you can implement your logic)
 previewFile(file: File): void {
  console.log('Previewing file:', file.name);
  // Implement your preview logic here
}

// Function to delete a file
deleteFile(file: File): void {
  const index = this.selectedFiles.indexOf(file);
  if (index !== -1) {
    this.selectedFiles.splice(index, 1);
  }
}
  

}