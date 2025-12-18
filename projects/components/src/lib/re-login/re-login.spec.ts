// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReLoginComponent } from './re-login';

describe('ReLoginComponent', () => {
  let component: ReLoginComponent;
  let fixture: ComponentFixture<ReLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReLoginComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form with username and password controls', () => {
    fixture.detectChanges();
    expect(component.reLoginForm).toBeDefined();
    expect(component.reLoginForm.get('username')).toBeDefined();
    expect(component.reLoginForm.get('password')).toBeDefined();
  });

  it('should disable username field', () => {
    fixture.detectChanges();
    const usernameControl = component.reLoginForm.get('username');
    expect(usernameControl?.disabled).toBeTrue();
  });

  it('should set username from input property', () => {
    component.username = 'test@example.com';
    fixture.detectChanges();
    
    const usernameControl = component.reLoginForm.get('username');
    expect(usernameControl?.value).toBe('test@example.com');
  });

  it('should require password', () => {
    fixture.detectChanges();
    const passwordControl = component.reLoginForm.get('password');
    
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();
    
    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should return false for isFormValid when password is empty', () => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('');
    
    expect(component.isFormValid).toBeFalse();
  });

  it('should return true for isFormValid when password is provided', () => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('password123');
    
    expect(component.isFormValid).toBeTrue();
  });

  it('should emit login event with credentials when loginClick is called', () => {
    component.username = 'test@example.com';
    fixture.detectChanges();
    
    component.reLoginForm.get('password')?.setValue('password123');
    
    spyOn(component.login, 'emit');
    
    component.loginClick();
    
    expect(component.login.emit).toHaveBeenCalledWith({
      username: 'test@example.com',
      password: 'password123'
    });
  });

  it('should set isProcessing to true when loginClick is called', () => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('password123');
    
    component.loginClick();
    
    expect(component.isProcessing).toBeTrue();
  });

  it('should not emit login event when form is invalid', () => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('');
    
    spyOn(component.login, 'emit');
    
    component.loginClick();
    
    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('should disable login button when form is invalid', () => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('.re-login__button');
    expect(button.disabled).toBeTrue();
  });

  it('should enable login button when form is valid', () => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('password123');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('.re-login__button');
    expect(button.disabled).toBeFalse();
  });

  it('should display session timeout message', () => {
    fixture.detectChanges();
    
    const message = fixture.nativeElement.querySelector('.re-login__message');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('session has expired');
  });

  it('should display lock icon', () => {
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('.re-login__icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent).toContain('lock');
  });

  it('should display title', () => {
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('.re-login__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Session Timeout');
  });

  it('should show processing button when isProcessing is true', () => {
    fixture.detectChanges();
    component.isProcessing = true;
    fixture.detectChanges();
    
    const processingButton = fixture.nativeElement.querySelector('.re-login__button--processing');
    expect(processingButton).toBeTruthy();
    expect(processingButton.textContent).toContain('Processing');
  });

  it('should show spinner icon when processing', () => {
    fixture.detectChanges();
    component.isProcessing = true;
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('.re-login__spinner');
    expect(spinner).toBeTruthy();
  });

  it('should reset isProcessing after timeout', (done) => {
    fixture.detectChanges();
    component.reLoginForm.get('password')?.setValue('password123');
    
    component.loginClick();
    
    expect(component.isProcessing).toBeTrue();
    
    setTimeout(() => {
      expect(component.isProcessing).toBeFalse();
      done();
    }, 1100);
  });

  it('should display password field with correct label', () => {
    fixture.detectChanges();
    
    const labels = fixture.nativeElement.querySelectorAll('mat-label');
    const passwordLabel = Array.from(labels).find((label: any) => 
      label.textContent.includes('Password')
    );
    
    expect(passwordLabel).toBeTruthy();
  });

  it('should display username field with disabled state', () => {
    component.username = 'test@example.com';
    fixture.detectChanges();
    
    const usernameInput = fixture.nativeElement.querySelector('input[type="email"]');
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.disabled).toBeTrue();
  });
});


