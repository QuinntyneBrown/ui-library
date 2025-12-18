// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from 'components';

@Component({
  selector: 'app-score-demo',
  standalone: true,
  imports: [CommonModule, ScoreComponent],
  templateUrl: './score-demo.html',
  styleUrls: ['./score-demo.scss']
})
export class ScoreDemoComponent {
}
