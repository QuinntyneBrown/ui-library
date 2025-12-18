import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';

describe('VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    component.videoId = 'dQw4w9WgXcQ';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with video ID', () => {
    expect(component.videoId).toBe('dQw4w9WgXcQ');
  });

  it('should have default width and height', () => {
    expect(component.width).toBe(640);
    expect(component.height).toBe(360);
  });

  it('should accept custom width and height', () => {
    component.width = 800;
    component.height = 600;
    expect(component.width).toBe(800);
    expect(component.height).toBe(600);
  });

  it('should generate video URL on init', () => {
    component.ngOnInit();
    expect(component.videoUrl).toBeTruthy();
  });

  it('should have player element reference', () => {
    expect(component.playerElement).toBeDefined();
  });
});
