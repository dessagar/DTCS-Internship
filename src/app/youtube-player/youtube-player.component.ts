import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  template: '<div [attr.id]="playerId"></div>', // Use attribute binding to dynamically set the id
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {
  @Input() youtubeUrl!: string;
  playerId!: string; // Define a playerId property

  constructor() { }

  ngOnInit(): void {
    // Extract video ID from the YouTube URL
    const videoId = this.extractVideoId(this.youtubeUrl);

    // Generate a unique playerId based on the videoId
    this.playerId = 'youtube-player-' + videoId;

    // Load the YouTube Player API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // Initialize the YouTube player once the API is loaded width="100%" height="180"
    (window as any)['onYouTubeIframeAPIReady'] = () => {
      new (window as any)['YT'].Player(this.playerId, { // Use playerId to initialize the player
          height: '280',
          width: '480',
          videoId: videoId
      });
    };
  }

  private extractVideoId(url: string): string {
    // Extract video ID from YouTube URL
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/\d\/|\/vi\/)([^\?&"'>]+)/);
    return videoIdMatch ? videoIdMatch[1] || '' : '';
  }
}
