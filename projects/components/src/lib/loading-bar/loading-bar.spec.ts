// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarComponent } from './loading-bar';
import { LoadingBarService } from './loading-bar.service';

describe('LoadingBarComponent', () => {
  let component: LoadingBarComponent;
  let fixture: ComponentFixture<LoadingBarComponent>;
  let service: LoadingBarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoadingBarComponent,
        NoopAnimationsModule
      ],
      providers: [LoadingBarService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBarComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LoadingBarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isActive false', () => {
    expect(component.isActive).toBeFalse();
  });

  it('should initialize with progress 0', () => {
    expect(component.progress).toBe(0);
  });

  it('should initialize with indeterminate mode', () => {
    expect(component.mode).toBe('indeterminate');
  });

  it('should subscribe to loading service on init', () => {
    service.start();
    fixture.detectChanges();
    
    expect(component.isActive).toBeTrue();
  });

  it('should update isActive when service emits', () => {
    service.start();
    fixture.detectChanges();
    
    expect(component.isActive).toBeTrue();
    
    service.stop();
    fixture.detectChanges();
    
    expect(component.isActive).toBeFalse();
  });

  it('should update progress when service emits', () => {
    service.setProgress(50);
    fixture.detectChanges();
    
    expect(component.progress).toBe(50);
  });

  it('should update mode when service emits', () => {
    service.setProgress(25);
    fixture.detectChanges();
    
    expect(component.mode).toBe('determinate');
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    
    component.ngOnDestroy();
    
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should display progress bar', () => {
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeTruthy();
  });

  it('should apply active class when isActive is true', () => {
    component.isActive = true;
    fixture.detectChanges();
    
    const container = fixture.nativeElement.querySelector('.loading-bar');
    expect(container.classList.contains('q-loading-bar--active')).toBeTrue();
  });

  it('should not apply active class when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    
    const container = fixture.nativeElement.querySelector('.loading-bar');
    expect(container.classList.contains('q-loading-bar--active')).toBeFalse();
  });

  it('should pass mode to progress bar', () => {
    component.mode = 'determinate';
    fixture.detectChanges();
    
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar.getAttribute('ng-reflect-mode')).toBe('determinate');
  });

  it('should pass progress value to progress bar', () => {
    component.progress = 75;
    component.mode = 'determinate';
    fixture.detectChanges();
    
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar.getAttribute('ng-reflect-value')).toBe('75');
  });

  it('should handle complete loading cycle', () => {
    service.start();
    fixture.detectChanges();
    expect(component.isActive).toBeTrue();
    
    service.complete();
    fixture.detectChanges();
    expect(component.progress).toBe(100);
  });

  it('should handle reset', () => {
    service.start();
    fixture.detectChanges();
    
    service.reset();
    fixture.detectChanges();
    
    expect(component.isActive).toBeFalse();
    expect(component.progress).toBe(0);
  });

  it('should handle multiple simultaneous requests', () => {
    service.start();
    service.start();
    service.start();
    fixture.detectChanges();
    
    expect(component.isActive).toBeTrue();
    
    service.stop();
    fixture.detectChanges();
    expect(component.isActive).toBeTrue();
    
    service.stop();
    service.stop();
    fixture.detectChanges();
    expect(component.isActive).toBeFalse();
  });
});


