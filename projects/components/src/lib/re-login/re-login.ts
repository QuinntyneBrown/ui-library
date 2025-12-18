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
  selector: 'q-re-login',
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
  templateUrl: './re-login.html',
  styleUrls: ['./re-login.scss']
})
export class ReLoginComponent implements OnInit {
  @Input() username = '';
  @Output() login = new EventEmitter<{ username: string; password: string }>();

  reLoginForm!: FormGroup;
  isProcessing = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.reLoginForm = this.formBuilder.group({
      username: [{ value: this.username, disabled: true }],
      password: ['', Validators.required]
    });
  }

  get isFormValid(): boolean {
    return this.reLoginForm.get('password')?.valid ?? false;
  }

  loginClick(): void {
    if (!this.isFormValid) {
      return;
    }

    this.isProcessing = true;

    const password = this.reLoginForm.get('password')?.value;
    
    // Emit login event with credentials
    this.login.emit({
      username: this.username,
      password: password
    });

    // Simulate processing - in real app, wait for service response
    setTimeout(() => {
      this.isProcessing = false;
    }, 1000);
  }
}

