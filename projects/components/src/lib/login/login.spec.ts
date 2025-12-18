// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with username and password controls', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should initialize password form with new password controls', () => {
    expect(component.passwordForm).toBeDefined();
    expect(component.passwordForm.get('newPassword')).toBeDefined();
    expect(component.passwordForm.get('confirmNewPassword')).toBeDefined();
  });

  it('should validate username as required and email', () => {
    const usernameControl = component.loginForm.get('username');
    
    usernameControl?.setValue('');
    expect(usernameControl?.hasError('required')).toBeTrue();
    
    usernameControl?.setValue('invalid-email');
    expect(usernameControl?.hasError('email')).toBeTrue();
    
    usernameControl?.setValue('valid@email.com');
    expect(usernameControl?.valid).toBeTrue();
  });

  it('should validate password as required', () => {
    const passwordControl = component.loginForm.get('password');
    
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();
    
    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should disable login button when form is invalid', () => {
    component.loginForm.get('username')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    
    expect(component.enableLogin()).toBeTrue();
  });

  it('should enable login button when form is valid', () => {
    component.loginForm.get('username')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('password123');
    
    expect(component.enableLogin()).toBeFalse();
  });

  it('should emit loginSuccessful when loginClick is called', (done) => {
    component.loginSuccessful.subscribe((success) => {
      expect(success).toBeTrue();
      done();
    });
    
    component.loginClick();
  });

  it('should set isProcessingToLogin to true when loginClick is called', () => {
    component.loginClick();
    expect(component.isProcessingToLogin).toBeTrue();
  });

  it('should emit showForgotPassword when invokeShowForgotPassword is called', () => {
    spyOn(component.showForgotPassword, 'emit');
    
    component.invokeShowForgotPassword();
    
    expect(component.showForgotPassword.emit).toHaveBeenCalledWith(true);
  });

  it('should validate new password with pattern', () => {
    const newPasswordControl = component.passwordForm.get('newPassword');
    
    newPasswordControl?.setValue('weak');
    expect(newPasswordControl?.hasError('pattern')).toBeTrue();
    
    newPasswordControl?.setValue('Password1');
    expect(newPasswordControl?.hasError('pattern')).toBeFalse();
  });

  it('should validate that new passwords match', () => {
    component.passwordForm.get('newPassword')?.setValue('Password1');
    component.passwordForm.get('confirmNewPassword')?.setValue('Password2');
    
    expect(component.passwordForm.get('confirmNewPassword')?.hasError('matches')).toBeTrue();
  });

  it('should not have error when new passwords match', () => {
    component.passwordForm.get('newPassword')?.setValue('Password1');
    component.passwordForm.get('confirmNewPassword')?.setValue('Password1');
    
    expect(component.passwordForm.get('confirmNewPassword')?.hasError('matches')).toBeFalsy();
  });

  it('should disable set password button when password form is invalid', () => {
    component.passwordForm.get('newPassword')?.setValue('');
    expect(component.allowPassword).toBeTrue();
  });

  it('should enable set password button when password form is valid', () => {
    component.passwordForm.get('newPassword')?.setValue('Password1');
    component.passwordForm.get('confirmNewPassword')?.setValue('Password1');
    expect(component.allowPassword).toBeFalse();
  });

  it('should emit loginSuccessful when setNewPasswordClick is called', (done) => {
    component.loginSuccessful.subscribe((success) => {
      expect(success).toBeTrue();
      done();
    });
    
    component.setNewPasswordClick();
  });

  it('should set isProcessingToSetNewPassword to true when setNewPasswordClick is called', () => {
    component.setNewPasswordClick();
    expect(component.isProcessingToSetNewPassword).toBeTrue();
  });

  it('should accept isHandset input', () => {
    component.isHandset = true;
    fixture.detectChanges();
    
    expect(component.isHandset).toBeTrue();
  });

  it('should accept isTabletLandscape input', () => {
    component.isTabletLandscape = true;
    fixture.detectChanges();
    
    expect(component.isTabletLandscape).toBeTrue();
  });

  it('should toggle requireNewPassword flag', () => {
    expect(component.requireNewPassword).toBeFalse();
    
    component.requireNewPassword = true;
    fixture.detectChanges();
    
    expect(component.requireNewPassword).toBeTrue();
  });

  it('should display login form when requireNewPassword is false', () => {
    component.requireNewPassword = false;
    fixture.detectChanges();
    
    const loginForm = fixture.nativeElement.querySelector('.login__form');
    expect(loginForm).toBeTruthy();
  });

  it('should display password setup form when requireNewPassword is true', () => {
    component.requireNewPassword = true;
    fixture.detectChanges();
    
    const passwordHeading = fixture.nativeElement.querySelector('.login__password-heading');
    expect(passwordHeading).toBeTruthy();
    expect(passwordHeading.textContent).toContain('Setup New Password');
  });

  it('should display error message for invalid entry', () => {
    component.loginForm.setErrors({ invalidEntry: true });
    fixture.detectChanges();
    
    const error = fixture.nativeElement.querySelector('.login__error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Invalid username or password');
  });

  it('should display error message for locked account', () => {
    component.loginForm.setErrors({ accountLocked: true });
    fixture.detectChanges();
    
    const error = fixture.nativeElement.querySelector('.login__error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('locked');
  });
});


