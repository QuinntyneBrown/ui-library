// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email control', () => {
    expect(component.forgotPasswordForm).toBeDefined();
    expect(component.forgotPasswordForm.get('email')).toBeDefined();
  });

  it('should validate email field as required', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();
    
    emailControl?.setValue('test@example.com');
    expect(emailControl?.hasError('required')).toBeFalse();
  });

  it('should validate email format', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTrue();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBeFalse();
  });

  it('should disable submit when form is invalid', () => {
    component.forgotPasswordForm.get('email')?.setValue('');
    expect(component.canSubmit).toBeFalse();
    
    component.forgotPasswordForm.get('email')?.setValue('invalid');
    expect(component.canSubmit).toBeFalse();
  });

  it('should enable submit when form is valid', () => {
    component.forgotPasswordForm.get('email')?.setValue('test@example.com');
    expect(component.canSubmit).toBeTrue();
  });

  it('should emit confirmSubmit event with email when requestPasswordReset is called', () => {
    const testEmail = 'test@example.com';
    spyOn(component.confirmSubmit, 'emit');
    
    component.forgotPasswordForm.get('email')?.setValue(testEmail);
    component.requestPasswordReset();
    
    expect(component.confirmSubmit.emit).toHaveBeenCalledWith(testEmail);
  });

  it('should set isProcessing to true when requestPasswordReset is called', () => {
    component.forgotPasswordForm.get('email')?.setValue('test@example.com');
    component.requestPasswordReset();
    
    expect(component.isProcessing).toBeTrue();
  });

  it('should navigate to login when navigateToLogin is called', () => {
    component.navigateToLogin();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set isProcessing to false when requestSent input changes to true', () => {
    component.isProcessing = true;
    component.requestSent = true;
    component.ngOnChanges();
    
    expect(component.isProcessing).toBeFalse();
  });

  it('should not set isProcessing to false when requestSent is false', () => {
    component.isProcessing = true;
    component.requestSent = false;
    component.ngOnChanges();
    
    expect(component.isProcessing).toBeTrue();
  });

  it('should accept isHandset input', () => {
    component.isHandset = true;
    fixture.detectChanges();
    
    expect(component.isHandset).toBeTrue();
  });

  it('should display correct heading when request is not sent', () => {
    component.requestSent = false;
    fixture.detectChanges();
    
    const heading = fixture.nativeElement.querySelector('.forgot-password__heading');
    expect(heading?.textContent).toContain('Enter Email Address');
  });

  it('should display success heading when request is sent', () => {
    component.requestSent = true;
    fixture.detectChanges();
    
    const heading = fixture.nativeElement.querySelector('.forgot-password__heading');
    expect(heading?.textContent).toContain('Password Change Link Sent');
  });

  it('should show submit button when not processing and not sent', () => {
    component.isProcessing = false;
    component.requestSent = false;
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.forgot-password__button');
    const submitButton = Array.from(buttons).find((btn: any) => 
      btn.textContent.includes('Submit')
    );
    expect(submitButton).toBeTruthy();
  });

  it('should show processing button when processing', () => {
    component.isProcessing = true;
    component.requestSent = false;
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.forgot-password__button');
    const processingButton = Array.from(buttons).find((btn: any) => 
      btn.textContent.includes('Processing')
    );
    expect(processingButton).toBeTruthy();
  });

  it('should show return button when request is sent', () => {
    component.requestSent = true;
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.forgot-password__button');
    const returnButton = Array.from(buttons).find((btn: any) => 
      btn.textContent.includes('Return to Login')
    );
    expect(returnButton).toBeTruthy();
  });

  it('should hide email field when request is sent', () => {
    component.requestSent = true;
    fixture.detectChanges();
    
    const emailField = fixture.nativeElement.querySelector('.forgot-password__field');
    expect(emailField).toBeFalsy();
  });

  it('should display email validation error when invalid', () => {
    const emailControl = component.forgotPasswordForm.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();
    component.forgotPasswordForm.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = fixture.nativeElement.querySelector('.forgot-password__error');
    expect(errorElement).toBeTruthy();
  });
});



