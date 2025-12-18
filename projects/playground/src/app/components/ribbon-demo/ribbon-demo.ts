// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RibbonComponent, RibbonItem } from 'components';

@Component({
  selector: 'app-ribbon-demo',
  standalone: true,
  imports: [CommonModule, RibbonComponent],
  templateUrl: './ribbon-demo.html',
  styleUrls: ['./ribbon-demo.scss']
})
export class RibbonDemoComponent {
  items: RibbonItem[] = [
    { id: '1', label: 'Overview' },
    { id: '2', label: 'Features' },
    { id: '3', label: 'Pricing' },
    { id: '4', label: 'Reviews' },
    { id: '5', label: 'Specifications' },
    { id: '6', label: 'Gallery' }
  ];

  handleItemClick(item: RibbonItem) {
    console.log('Ribbon item clicked:', item);
  }
}
