// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleAndTextComponent } from 'components';

@Component({
  selector: 'app-title-and-text-demo',
  standalone: true,
  imports: [CommonModule, TitleAndTextComponent],
  templateUrl: './title-and-text-demo.html',
  styleUrls: ['./title-and-text-demo.scss']
})
export class TitleAndTextDemoComponent {
}
