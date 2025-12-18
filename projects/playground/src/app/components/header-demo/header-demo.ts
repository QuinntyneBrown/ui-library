// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from 'components';

@Component({
  selector: 'app-header-demo',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './header-demo.html',
  styleUrls: ['./header-demo.scss']
})
export class HeaderDemoComponent {
}
