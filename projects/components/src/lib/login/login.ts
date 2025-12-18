// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'q-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  @Input() isTabletLandscape = false;
  @Input() isHandset = false;

  @Output() loginSuccessful = new EventEmitter<boolean>();
  @Output() showForgotPassword = new EventEmitter<boolean>();

  loginForm!: FormGroup;
  passwordForm!: FormGroup;
  requireNewPassword = false;
  isProcessingToLogin = false;
  isProcessingToSetNewPassword = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
    this.passwordForm = this.createPasswordFormGroup();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  enableLogin(): boolean {
    return !this.loginForm.valid || this.loginForm.hasError('invalidEntry');
  }

  createPasswordFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
          ]
        ],
        confirmNewPassword: ['', [Validators.required]]
      },
      { validators: this.validatePassword }
    );
  }

  private validatePassword(fg: FormGroup): { [key: string]: boolean } | null {
    const passwordInput = fg.get('newPassword')?.value;
    const confirmPasswordInput = fg.get('confirmNewPassword')?.value;

    if (passwordInput && confirmPasswordInput) {
      if (passwordInput !== confirmPasswordInput) {
        fg.get('confirmNewPassword')?.setErrors({ matches: true });
        return { invalid: true };
      }
    }
    return null;
  }

  get allowPassword(): boolean {
    return !(
      this.passwordForm.get('newPassword')?.valid &&
      this.passwordForm.get('confirmNewPassword')?.valid &&
      !this.passwordForm.get('confirmNewPassword')?.hasError('matches')
    );
  }

  loginClick(): void {
    this.isProcessingToLogin = true;
    // Simulate login - in real app, call authentication service
    setTimeout(() => {
      this.isProcessingToLogin = false;
      this.loginSuccessful.emit(true);
    }, 1000);
  }

  setNewPasswordClick(): void {
    this.isProcessingToSetNewPassword = true;
    // Simulate password change - in real app, call authentication service
    setTimeout(() => {
      this.isProcessingToSetNewPassword = false;
      this.loginSuccessful.emit(true);
    }, 1000);
  }

  invokeShowForgotPassword(): void {
    this.showForgotPassword.emit(true);
  }
}

