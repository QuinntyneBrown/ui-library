// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsupportedBrowserComponent } from 'components';

@Component({
  selector: 'app-unsupported-browser-demo',
  standalone: true,
  imports: [CommonModule, UnsupportedBrowserComponent],
  templateUrl: './unsupported-browser-demo.html',
  styleUrls: ['./unsupported-browser-demo.scss']
})
export class UnsupportedBrowserDemoComponent {}
