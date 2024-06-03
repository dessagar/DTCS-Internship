import { Component, OnInit } from '@angular/core';
import { ContentService } from '../admin-preview/content.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-clang',
  templateUrl: './clang.component.html',
  styleUrls: ['./clang.component.scss']
})
export class ClangComponent implements OnInit {
  rawContent: string = ''; // Store raw HTML content

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Subscribe to changes in saved content
    this.contentService.savedContent$.subscribe((content) => {
      console.log('Received Content:', content);
      this.rawContent = content.toString(); // Convert SafeHtml to string
    });
  }

  get sanitizedContent(): SafeHtml {
    // Use DomSanitizer to sanitize the HTML content
    return this.sanitizer.bypassSecurityTrustHtml(this.rawContent);
  }
  }
  
  
