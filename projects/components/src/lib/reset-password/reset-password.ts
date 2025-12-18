// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
  selector: 'q-reset-password',
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
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPasswordComponent implements OnInit, OnChanges {
  passwordForm!: FormGroup;
  
  @Input() isRequestCompleted = false;
  @Input() isHandset = false;

  @Output() confirmSubmit = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.passwordForm = this.createFormGroup();
  }

  ngOnChanges(): void {
    if (this.isRequestCompleted) {
      this.passwordForm.reset();
    }
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
    }
    return null;
  }

  get allowPassword(): boolean {
    return !(
      this.passwordForm.get('password')?.valid &&
      this.passwordForm.get('confirmPassword')?.valid &&
      !this.passwordForm.get('confirmPassword')?.hasError('passwordMismatch')
    );
  }

  resetPassword(): void {
    if (this.passwordForm.valid) {
      this.confirmSubmit.emit(this.passwordForm.get('password')?.value);
    }
  }
}

