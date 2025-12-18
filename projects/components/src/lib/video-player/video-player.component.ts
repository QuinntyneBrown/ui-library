import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'q-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() videoId!: string;
  @Input() width: number = 640;
  @Input() height: number = 360;
  @ViewChild('playerElement', { static: false }) playerElement!: ElementRef;

  player: any;
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}?autoplay=1&theme=light&color=white&iv_load_policy=3&showinfo=1&controls=1`
    );
  }

  ngAfterViewInit(): void {
    this.loadYouTubeAPI();
  }

  private loadYouTubeAPI(): void {
    const scriptTag = document.getElementById('youtube-player');
    
    if (!scriptTag) {
      this.insertYouTubeScriptTag();
    } else if (!window.YT) {
      setTimeout(() => this.onYouTubeIFrameAPIReady(), 300);
    } else {
      this.onYouTubeIFrameAPIReady();
    }
  }

  private insertYouTubeScriptTag(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.id = 'youtube-player';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    window.onYouTubeIframeAPIReady = () => this.onYouTubeIFrameAPIReady();
  }

  private onYouTubeIFrameAPIReady(): void {
    if (window.YT && window.YT.Player) {
      this.player = new window.YT.Player(this.playerElement.nativeElement, {
        playerVars: {
          autoplay: 1,
          theme: 'light',
          color: 'white',
          iv_load_policy: 3,
          showinfo: 1,
          controls: 1
        },
        height: this.height,
        width: this.width,
        videoId: this.videoId
      });
    }
  }
}
