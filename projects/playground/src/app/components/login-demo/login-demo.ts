// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'components';

@Component({
  selector: 'app-login-demo',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './login-demo.html',
  styleUrls: ['./login-demo.scss']
})
export class LoginDemoComponent {
  handleLoginSuccess(success: boolean) {
    console.log('Login successful:', success);
  }

  handleShowForgotPassword(show: boolean) {
    console.log('Show forgot password:', show);
  }
}
