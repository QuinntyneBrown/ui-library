// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from 'components';

@Component({
  selector: 'app-hero-demo',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './hero-demo.html',
  styleUrls: ['./hero-demo.scss']
})
export class HeroDemoComponent {
}
