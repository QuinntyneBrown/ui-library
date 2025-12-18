// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReLoginComponent } from 'components';

@Component({
  selector: 'app-re-login-demo',
  standalone: true,
  imports: [CommonModule, ReLoginComponent],
  templateUrl: './re-login-demo.html',
  styleUrls: ['./re-login-demo.scss']
})
export class ReLoginDemoComponent {
  username = 'user@example.com';

  handleLogin(credentials: { username: string; password: string }) {
    console.log('Re-login:', credentials);
  }
}
