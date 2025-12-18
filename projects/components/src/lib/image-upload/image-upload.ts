// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  Component,
  forwardRef,
  Input,
  OnInit
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'q-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ],
  templateUrl: './image-upload.html',
  styleUrls: ['./image-upload.scss']
})
export class ImageUploadComponent implements ControlValueAccessor, OnInit {
  @Input() maxWidth = 800;
  @Input() maxHeight = 600;
  @Input() label = 'Upload Image';

  imageControl = new FormControl<string | null>(null);
  imagePreview: string | null = null;
  isDragging = false;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.imageControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  writeValue(value: string | null): void {
    this.imageControl.setValue(value, { emitEvent: false });
    this.imagePreview = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.imageControl.disable();
    } else {
      this.imageControl.enable();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
    this.onTouched();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
    this.onTouched();
  }

  private processFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      console.error('File is not an image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        const resizedImage = this.resizeImage(img);
        this.imagePreview = resizedImage;
        this.imageControl.setValue(resizedImage);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  private resizeImage(img: HTMLImageElement): string {
    let width = img.width;
    let height = img.height;

    // Calculate aspect ratio
    if (width > this.maxWidth || height > this.maxHeight) {
      const aspectRatio = width / height;
      
      if (width > height) {
        width = this.maxWidth;
        height = width / aspectRatio;
      } else {
        height = this.maxHeight;
        width = height * aspectRatio;
      }
    }

    // Create canvas and resize
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', 0.9);
  }

  removeImage(): void {
    this.imagePreview = null;
    this.imageControl.setValue(null);
    this.onTouched();
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput?.click();
  }
}

