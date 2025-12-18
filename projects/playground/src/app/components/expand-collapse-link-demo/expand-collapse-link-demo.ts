// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandCollapseLinkComponent } from 'components';

@Component({
  selector: 'app-expand-collapse-link-demo',
  standalone: true,
  imports: [CommonModule, ExpandCollapseLinkComponent],
  templateUrl: './expand-collapse-link-demo.html',
  styleUrls: ['./expand-collapse-link-demo.scss']
})
export class ExpandCollapseLinkDemoComponent {
  isExpanded = false;

  handleExpandCollapse(isOpen: boolean) {
    this.isExpanded = isOpen;
    console.log('Expand/Collapse state:', isOpen);
  }
}
