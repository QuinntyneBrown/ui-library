// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TestBed } from '@angular/core/testing';
import { LoadingBarService } from './loading-bar.service';

describe('LoadingBarService', () => {
  let service: LoadingBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit loading state when start is called', (done) => {
    service.loading$.subscribe(state => {
      expect(state.active).toBeTrue();
      expect(state.mode).toBe('indeterminate');
      done();
    });

    service.start();
  });

  it('should increment active requests when start is called', () => {
    service.start();
    service.start();
    
    service.loading$.subscribe(state => {
      expect(state.active).toBeTrue();
    });
  });

  it('should decrement active requests when stop is called', (done) => {
    service.start();
    service.start();
    service.stop();
    
    service.loading$.subscribe(state => {
      expect(state.active).toBeTrue();
      done();
    });
  });

  it('should emit inactive state when all requests stop', (done) => {
    service.start();
    
    service.stop();
    
    service.loading$.subscribe(state => {
      expect(state.active).toBeFalse();
      expect(state.progress).toBe(100);
      done();
    });
  });

  it('should set progress when setProgress is called', (done) => {
    service.setProgress(50);
    
    service.loading$.subscribe(state => {
      expect(state.progress).toBe(50);
      expect(state.mode).toBe('determinate');
      expect(state.active).toBeTrue();
      done();
    });
  });

  it('should clamp progress between 0 and 100', (done) => {
    service.setProgress(150);
    
    service.loading$.subscribe(state => {
      expect(state.progress).toBe(100);
      done();
    });
  });

  it('should clamp negative progress to 0', (done) => {
    service.setProgress(-50);
    
    service.loading$.subscribe(state => {
      expect(state.progress).toBe(0);
      done();
    });
  });

  it('should complete loading when complete is called', (done) => {
    service.start();
    
    service.complete();
    
    service.loading$.subscribe(state => {
      expect(state.progress).toBe(100);
      done();
    });
  });

  it('should reset after complete timeout', (done) => {
    service.start();
    service.complete();
    
    setTimeout(() => {
      service.loading$.subscribe(state => {
        expect(state.active).toBeFalse();
        done();
      });
    }, 400);
  });

  it('should reset all state when reset is called', (done) => {
    service.start();
    service.setProgress(50);
    
    service.reset();
    
    service.loading$.subscribe(state => {
      expect(state.active).toBeFalse();
      expect(state.progress).toBe(0);
      done();
    });
  });

  it('should not allow negative active requests', () => {
    service.stop();
    service.stop();
    
    service.loading$.subscribe(state => {
      expect(state.active).toBeFalse();
    });
  });

  it('should emit determinate mode when setProgress is called', (done) => {
    service.setProgress(25);
    
    service.loading$.subscribe(state => {
      expect(state.mode).toBe('determinate');
      done();
    });
  });

  it('should emit indeterminate mode when start is called', (done) => {
    service.start();
    
    service.loading$.subscribe(state => {
      expect(state.mode).toBe('indeterminate');
      done();
    });
  });

  it('should handle multiple start/stop cycles', () => {
    let emissionCount = 0;
    
    service.loading$.subscribe(() => {
      emissionCount++;
    });
    
    service.start();
    service.stop();
    service.start();
    service.stop();
    
    expect(emissionCount).toBeGreaterThan(0);
  });

  it('should provide observable for loading state', () => {
    expect(service.loading$).toBeDefined();
    expect(service.loading$.subscribe).toBeDefined();
  });
});


