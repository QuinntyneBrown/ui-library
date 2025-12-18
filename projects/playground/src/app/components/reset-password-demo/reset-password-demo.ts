// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from 'components';

@Component({
  selector: 'app-reset-password-demo',
  standalone: true,
  imports: [CommonModule, ResetPasswordComponent],
  templateUrl: './reset-password-demo.html',
  styleUrls: ['./reset-password-demo.scss']
})
export class ResetPasswordDemoComponent {
  handlePasswordReset(event: any) {
    console.log('Password reset:', event);
  }
}
