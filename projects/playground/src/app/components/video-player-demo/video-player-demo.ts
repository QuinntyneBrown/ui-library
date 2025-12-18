// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from 'components';

@Component({
  selector: 'app-video-player-demo',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './video-player-demo.html',
  styleUrls: ['./video-player-demo.scss']
})
export class VideoPlayerDemoComponent {
}
