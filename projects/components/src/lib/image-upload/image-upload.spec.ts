// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadComponent } from './image-upload';

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ImageUploadComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null image preview', () => {
    expect(component.imagePreview).toBeNull();
  });

  it('should initialize imageControl', () => {
    expect(component.imageControl).toBeDefined();
    expect(component.imageControl.value).toBeNull();
  });

  it('should accept maxWidth input', () => {
    component.maxWidth = 1024;
    fixture.detectChanges();
    
    expect(component.maxWidth).toBe(1024);
  });

  it('should accept maxHeight input', () => {
    component.maxHeight = 768;
    fixture.detectChanges();
    
    expect(component.maxHeight).toBe(768);
  });

  it('should accept label input', () => {
    component.label = 'Upload Profile Picture';
    fixture.detectChanges();
    
    expect(component.label).toBe('Upload Profile Picture');
  });

  it('should implement ControlValueAccessor', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.setDisabledState).toBeDefined();
  });

  it('should write value to imageControl', () => {
    const base64Image = 'data:image/jpeg;base64,test';
    component.writeValue(base64Image);
    
    expect(component.imageControl.value).toBe(base64Image);
    expect(component.imagePreview).toBe(base64Image);
  });

  it('should register onChange callback', () => {
    const callback = jasmine.createSpy('onChange');
    component.registerOnChange(callback);
    
    component.imageControl.setValue('test');
    
    expect(callback).toHaveBeenCalledWith('test');
  });

  it('should register onTouched callback', () => {
    const callback = jasmine.createSpy('onTouched');
    component.registerOnTouched(callback);
    
    component.removeImage();
    
    expect(callback).toHaveBeenCalled();
  });

  it('should disable imageControl when setDisabledState is true', () => {
    component.setDisabledState(true);
    
    expect(component.imageControl.disabled).toBeTrue();
  });

  it('should enable imageControl when setDisabledState is false', () => {
    component.setDisabledState(false);
    
    expect(component.imageControl.enabled).toBeTrue();
  });

  it('should remove image when removeImage is called', () => {
    component.imagePreview = 'data:image/jpeg;base64,test';
    component.imageControl.setValue('data:image/jpeg;base64,test');
    
    component.removeImage();
    
    expect(component.imagePreview).toBeNull();
    expect(component.imageControl.value).toBeNull();
  });

  it('should set isDragging to true on dragover', () => {
    const event = new DragEvent('dragover');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    
    component.onDragOver(event);
    
    expect(component.isDragging).toBeTrue();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should set isDragging to false on dragleave', () => {
    component.isDragging = true;
    
    const event = new DragEvent('dragleave');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    
    component.onDragLeave(event);
    
    expect(component.isDragging).toBeFalse();
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should display placeholder when no image preview', () => {
    component.imagePreview = null;
    fixture.detectChanges();
    
    const placeholder = fixture.nativeElement.querySelector('.image-upload__placeholder');
    expect(placeholder).toBeTruthy();
  });

  it('should display preview when image is set', () => {
    component.imagePreview = 'data:image/jpeg;base64,test';
    fixture.detectChanges();
    
    const preview = fixture.nativeElement.querySelector('.image-upload__preview-container');
    expect(preview).toBeTruthy();
  });

  it('should display label in placeholder', () => {
    component.label = 'Custom Label';
    component.imagePreview = null;
    fixture.detectChanges();
    
    const text = fixture.nativeElement.querySelector('.image-upload__text');
    expect(text.textContent).toContain('Custom Label');
  });

  it('should display max dimensions info', () => {
    component.maxWidth = 1024;
    component.maxHeight = 768;
    fixture.detectChanges();
    
    const info = fixture.nativeElement.querySelector('.image-upload__info');
    expect(info.textContent).toContain('1024x768');
  });

  it('should add dragging class when isDragging is true', () => {
    component.isDragging = true;
    fixture.detectChanges();
    
    const dropZone = fixture.nativeElement.querySelector('.image-upload__drop-zone');
    expect(dropZone.classList.contains('q-image-upload__drop-zone--dragging')).toBeTrue();
  });

  it('should add has-image class when imagePreview is set', () => {
    component.imagePreview = 'data:image/jpeg;base64,test';
    fixture.detectChanges();
    
    const dropZone = fixture.nativeElement.querySelector('.image-upload__drop-zone');
    expect(dropZone.classList.contains('q-image-upload__drop-zone--has-image')).toBeTrue();
  });

  it('should display edit and delete buttons when image is present', () => {
    component.imagePreview = 'data:image/jpeg;base64,test';
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.image-upload__action-button');
    expect(buttons.length).toBe(2);
  });

  it('should hide file input', () => {
    const fileInput = fixture.nativeElement.querySelector('.image-upload__file-input');
    expect(fileInput).toBeTruthy();
    
    const styles = window.getComputedStyle(fileInput);
    expect(styles.display).toBe('none');
  });

  it('should call onChange when image control value changes', () => {
    const callback = jasmine.createSpy('onChange');
    component.registerOnChange(callback);
    
    const base64 = 'data:image/jpeg;base64,test';
    component.imageControl.setValue(base64);
    
    expect(callback).toHaveBeenCalledWith(base64);
  });

  it('should display upload icon', () => {
    component.imagePreview = null;
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('.image-upload__icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent).toContain('cloud_upload');
  });

  it('should display drag and drop hint', () => {
    component.imagePreview = null;
    fixture.detectChanges();
    
    const hint = fixture.nativeElement.querySelector('.image-upload__hint');
    expect(hint).toBeTruthy();
    expect(hint.textContent).toContain('Drag and drop');
  });
});


