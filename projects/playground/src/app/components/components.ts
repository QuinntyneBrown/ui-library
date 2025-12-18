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
    { name: 'Carousel', route: 'carousel' },
    { name: 'Expand Collapse Link', route: 'expand-collapse-link' },
    { name: 'Forgot Password', route: 'forgot-password' },
    { name: 'Header', route: 'header' },
    { name: 'Hero', route: 'hero' },
    { name: 'Image Upload', route: 'image-upload' },
    { name: 'Loading Bar', route: 'loading-bar' },
    { name: 'Localized', route: 'localized' },
    { name: 'Login', route: 'login' },
    { name: 'Phone Number', route: 'phone-number' },
    { name: 'Re-Login', route: 're-login' },
    { name: 'Reset Password', route: 'reset-password' },
    { name: 'Ribbon', route: 'ribbon' },
    { name: 'Score', route: 'score' },
    { name: 'Section', route: 'section' },
    { name: 'Title and Text', route: 'title-and-text' },
    { name: 'Unsupported Browser', route: 'unsupported-browser' },
    { name: 'Video Player', route: 'video-player' }
  ];
}
