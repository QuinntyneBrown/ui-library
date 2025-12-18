// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from 'components';

@Component({
  selector: 'app-image-upload-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploadComponent],
  templateUrl: './image-upload-demo.html',
  styleUrls: ['./image-upload-demo.scss']
})
export class ImageUploadDemoComponent {
  imageControl = new FormControl<string | null>(null);

  constructor() {
    this.imageControl.valueChanges.subscribe(value => {
      console.log('Image value:', value ? 'Base64 image data' : 'null');
    });
  }
}
