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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'q-forgot-password',
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
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPasswordComponent implements OnInit, OnChanges {
  forgotPasswordForm!: FormGroup;
  isProcessing = false;
  @Input() requestSent = false;
  @Input() isHandset = false;

  @Output() confirmSubmit = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.createFormGroup();
  }

  ngOnChanges(): void {
    if (this.requestSent) {
      this.isProcessing = false;
    }
  }

  public createFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get canSubmit(): boolean {
    return this.forgotPasswordForm.valid;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  requestPasswordReset(): void {
    this.isProcessing = true;
    this.confirmSubmit.emit(this.forgotPasswordForm.get('email')?.value);
  }
}

