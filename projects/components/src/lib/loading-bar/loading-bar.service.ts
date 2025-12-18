// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface LoadingBarState {
  active: boolean;
  progress: number;
  mode: 'determinate' | 'indeterminate';
}

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  private loadingSubject = new Subject<LoadingBarState>();
  private activeRequests = 0;
  private progress = 0;

  loading$: Observable<LoadingBarState> = this.loadingSubject.asObservable();

  start(): void {
    this.activeRequests++;
    this.emitState(true, 0, 'indeterminate');
  }

  stop(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    
    if (this.activeRequests === 0) {
      this.emitState(false, 100, 'determinate');
      this.progress = 0;
    }
  }

  setProgress(progress: number): void {
    this.progress = Math.min(100, Math.max(0, progress));
    this.emitState(true, this.progress, 'determinate');
  }

  complete(): void {
    this.activeRequests = 0;
    this.progress = 100;
    this.emitState(true, 100, 'determinate');
    
    setTimeout(() => {
      this.emitState(false, 100, 'determinate');
      this.progress = 0;
    }, 300);
  }

  reset(): void {
    this.activeRequests = 0;
    this.progress = 0;
    this.emitState(false, 0, 'indeterminate');
  }

  private emitState(active: boolean, progress: number, mode: 'determinate' | 'indeterminate'): void {
    this.loadingSubject.next({ active, progress, mode });
  }
}

