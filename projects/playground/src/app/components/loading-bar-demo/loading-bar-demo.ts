// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBarComponent, LoadingBarService } from 'components';

@Component({
  selector: 'app-loading-bar-demo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, LoadingBarComponent],
  templateUrl: './loading-bar-demo.html',
  styleUrls: ['./loading-bar-demo.scss']
})
export class LoadingBarDemoComponent {
  constructor(private loadingBarService: LoadingBarService) {}

  startLoading() {
    this.loadingBarService.start();
  }

  stopLoading() {
    this.loadingBarService.stop();
  }

  setProgress(value: number) {
    this.loadingBarService.setProgress(value);
  }

  completeLoading() {
    this.loadingBarService.complete();
  }

  resetLoading() {
    this.loadingBarService.reset();
  }
}
