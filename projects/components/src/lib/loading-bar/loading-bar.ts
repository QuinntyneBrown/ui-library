// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingBarService, LoadingBarState } from './loading-bar.service';

@Component({
  selector: 'q-loading-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './loading-bar.html',
  styleUrls: ['./loading-bar.scss']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
  isActive = false;
  progress = 0;
  mode: 'determinate' | 'indeterminate' = 'indeterminate';

  private destroy$ = new Subject<void>();

  constructor(private loadingBarService: LoadingBarService) {}

  ngOnInit(): void {
    this.loadingBarService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: LoadingBarState) => {
        this.isActive = state.active;
        this.progress = state.progress;
        this.mode = state.mode;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

