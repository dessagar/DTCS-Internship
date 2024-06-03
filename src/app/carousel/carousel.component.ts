import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnChanges, OnInit {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() description: string = " ";
  @Input() imageSrc!: string;
  @Input() modalId!: string;
  @Input() modalTarget!: string;
  @Input() activeTab: string = 'local'; // Initialize activeTab to 'video'
  @Input() videoData!: any[];
  @Input() localData: any[] = []; // Assuming localData is an array of video information
slide: any;
truncatedDescription: string = '';
showFullDescription: boolean = false;
labelName: string | null = null;

@Input() videoUrls!: string[];

  ngOnInit(): void {
    this.truncateDescription();
 // Extract the labelName from the URL when the component initializes
 this.route.paramMap.subscribe(params => {
  this.labelName = params.get('labelName');
});
    console.log('OnInit - Title:', this.title);
    console.log('OnInit - SubTitle:', this.subTitle);
    console.log('OnInit - description:', this.description);
    console.log('OnInit - ImageSrc:', this.imageSrc);
    console.log('OnInit - Labename:', this.labelName);

    
  }

  constructor(private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     $('#carouselExampleIndicators').carousel(); // Add your Bootstrap carousel initialization code
  //   });
  // }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes);  
  
    if (changes['activeTab'] || changes['videoData'] || changes['localData']) {
      console.log('Active Tab:', this.activeTab);
      console.log('Video Data:', this.videoData);
      console.log('Local Data:', this.localData);
  
      // No need to sanitize video URLs
    }
  }

  truncateDescription() {
    const words = this.description.split(' ');
    const maxWordsWithImage = 10;
    const maxWordsWithoutImage = 50;
    const maxWords = this.imageSrc ? maxWordsWithImage : maxWordsWithoutImage;

    if (words.length > maxWords) {
      this.truncatedDescription = words.slice(0, maxWords).join(' ') + '...';
    } else {
      this.truncatedDescription = this.description;
    }
  }
  
  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
   // Method to determine whether to display the "Read More" button
   showReadMoreButton(): boolean {
    const words = this.description.split(' ');
    const maxWordsWithImage = 10;
    const maxWordsWithoutImage = 50;
    const maxWords = this.imageSrc ? maxWordsWithImage : maxWordsWithoutImage;
    return words.length > maxWords;
  }
  getVideoUrl(filename: string): SafeResourceUrl {
    // Remove the fake path part
    const sanitizedFilename = filename.replace(/^.*[\\\/]/, '');
    const videoUrl = `http://localhost:3000/uploads/default/${sanitizedFilename}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
  
}