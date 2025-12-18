// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './components.html',
  styleUrls: ['./components.scss']
})
export class ComponentsComponent {
  components = [
    { name: 'Forgot Password', route: 'forgot-password' },
    { name: 'Reset Password', route: 'reset-password' },
    { name: 'Login', route: 'login' },
    { name: 'Re-Login', route: 're-login' },
    { name: 'Image Upload', route: 'image-upload' },
    { name: 'Loading Bar', route: 'loading-bar' },
    { name: 'Phone Number', route: 'phone-number' },
    { name: 'Unsupported Browser', route: 'unsupported-browser' },
    { name: 'Localized', route: 'localized' }
  ];
}
