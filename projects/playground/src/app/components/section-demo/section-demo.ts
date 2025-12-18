// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from 'components';

@Component({
  selector: 'app-section-demo',
  standalone: true,
  imports: [CommonModule, SectionComponent],
  templateUrl: './section-demo.html',
  styleUrls: ['./section-demo.scss']
})
export class SectionDemoComponent {
}
