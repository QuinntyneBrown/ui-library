// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './reset-password';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with password controls', () => {
    expect(component.passwordForm).toBeDefined();
    expect(component.passwordForm.get('password')).toBeDefined();
    expect(component.passwordForm.get('confirmPassword')).toBeDefined();
  });

  it('should validate password as required', () => {
    const passwordControl = component.passwordForm.get('password');
    
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();
  });

  it('should validate password minimum length', () => {
    const passwordControl = component.passwordForm.get('password');
    
    passwordControl?.setValue('Pass1');
    expect(passwordControl?.hasError('minlength')).toBeTrue();
    
    passwordControl?.setValue('Password1');
    expect(passwordControl?.hasError('minlength')).toBeFalse();
  });

  it('should validate password pattern', () => {
    const passwordControl = component.passwordForm.get('password');
    
    passwordControl?.setValue('password');
    expect(passwordControl?.hasError('pattern')).toBeTrue();
    
    passwordControl?.setValue('PASSWORD');
    expect(passwordControl?.hasError('pattern')).toBeTrue();
    
    passwordControl?.setValue('Password');
    expect(passwordControl?.hasError('pattern')).toBeTrue();
    
    passwordControl?.setValue('Password1');
    expect(passwordControl?.hasError('pattern')).toBeFalse();
  });

  it('should validate confirm password as required', () => {
    const confirmPasswordControl = component.passwordForm.get('confirmPassword');
    
    confirmPasswordControl?.setValue('');
    expect(confirmPasswordControl?.hasError('required')).toBeTrue();
  });

  it('should validate that passwords match', () => {
    const passwordControl = component.passwordForm.get('password');
    const confirmPasswordControl = component.passwordForm.get('confirmPassword');
    
    passwordControl?.setValue('Password1');
    confirmPasswordControl?.setValue('Password2');
    
    expect(confirmPasswordControl?.hasError('passwordMismatch')).toBeTrue();
  });

  it('should not have error when passwords match', () => {
    const passwordControl = component.passwordForm.get('password');
    const confirmPasswordControl = component.passwordForm.get('confirmPassword');
    
    passwordControl?.setValue('Password1');
    confirmPasswordControl?.setValue('Password1');
    
    expect(confirmPasswordControl?.hasError('passwordMismatch')).toBeFalsy();
  });

  it('should disable submit button when form is invalid', () => {
    component.passwordForm.get('password')?.setValue('');
    expect(component.allowPassword).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.passwordForm.get('password')?.setValue('Password1');
    component.passwordForm.get('confirmPassword')?.setValue('Password1');
    expect(component.allowPassword).toBeFalse();
  });

  it('should emit confirmSubmit event when resetPassword is called with valid form', () => {
    spyOn(component.confirmSubmit, 'emit');
    const testPassword = 'Password1';
    
    component.passwordForm.get('password')?.setValue(testPassword);
    component.passwordForm.get('confirmPassword')?.setValue(testPassword);
    component.resetPassword();
    
    expect(component.confirmSubmit.emit).toHaveBeenCalledWith(testPassword);
  });

  it('should not emit when form is invalid', () => {
    spyOn(component.confirmSubmit, 'emit');
    
    component.passwordForm.get('password')?.setValue('weak');
    component.resetPassword();
    
    expect(component.confirmSubmit.emit).not.toHaveBeenCalled();
  });

  it('should reset form when isRequestCompleted changes to true', () => {
    component.passwordForm.get('password')?.setValue('Password1');
    component.passwordForm.get('confirmPassword')?.setValue('Password1');
    
    component.isRequestCompleted = true;
    component.ngOnChanges();
    
    expect(component.passwordForm.get('password')?.value).toBe(null);
    expect(component.passwordForm.get('confirmPassword')?.value).toBe(null);
  });

  it('should accept isHandset input', () => {
    component.isHandset = true;
    fixture.detectChanges();
    
    expect(component.isHandset).toBeTrue();
  });

  it('should display form fields when not completed', () => {
    component.isRequestCompleted = false;
    fixture.detectChanges();
    
    const fields = fixture.nativeElement.querySelector('.reset-password__fields');
    expect(fields).toBeTruthy();
  });

  it('should display success message when completed', () => {
    component.isRequestCompleted = true;
    fixture.detectChanges();
    
    const success = fixture.nativeElement.querySelector('.reset-password__success');
    expect(success).toBeTruthy();
  });

  it('should hide form fields when completed', () => {
    component.isRequestCompleted = true;
    fixture.detectChanges();
    
    const fields = fixture.nativeElement.querySelector('.reset-password__fields');
    expect(fields).toBeFalsy();
  });

  it('should display password requirements help icon', () => {
    component.isRequestCompleted = false;
    fixture.detectChanges();
    
    const helpIcon = fixture.nativeElement.querySelector('.reset-password__help-icon');
    expect(helpIcon).toBeTruthy();
  });

  it('should show error when passwords do not match', () => {
    component.passwordForm.get('password')?.setValue('Password1');
    component.passwordForm.get('confirmPassword')?.setValue('Password2');
    component.passwordForm.get('confirmPassword')?.markAsTouched();
    fixture.detectChanges();
    
    const errorElements = fixture.nativeElement.querySelectorAll('mat-error');
    const mismatchError = Array.from(errorElements).find((el: any) =>
      el.textContent.includes('do not match')
    );
    expect(mismatchError).toBeTruthy();
  });
});


