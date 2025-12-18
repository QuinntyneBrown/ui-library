// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from 'components';

@Component({
  selector: 'app-forgot-password-demo',
  standalone: true,
  imports: [CommonModule, ForgotPasswordComponent],
  templateUrl: './forgot-password-demo.html',
  styleUrls: ['./forgot-password-demo.scss']
})
export class ForgotPasswordDemoComponent {
  handleConfirmSubmit(event: any) {
    console.log('Confirm submit:', event);
  }
}
