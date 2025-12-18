// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
}

@Component({
  selector: 'q-unsupported-browser',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './unsupported-browser.html',
  styleUrls: ['./unsupported-browser.scss']
})
export class UnsupportedBrowserComponent implements OnInit {
  browserInfo: BrowserInfo = {
    name: 'Unknown',
    version: '0',
    isSupported: true
  };

  supportedBrowsers = [
    {
      name: 'Google Chrome',
      url: 'https://www.google.com/chrome/',
      icon: 'public'
    },
    {
      name: 'Mozilla Firefox',
      url: 'https://www.mozilla.org/firefox/',
      icon: 'public'
    },
    {
      name: 'Microsoft Edge',
      url: 'https://www.microsoft.com/edge',
      icon: 'public'
    },
    {
      name: 'Safari',
      url: 'https://www.apple.com/safari/',
      icon: 'public'
    }
  ];

  ngOnInit(): void {
    this.browserInfo = this.detectBrowser();
  }

  private detectBrowser(): BrowserInfo {
    const userAgent = navigator.userAgent;
    let name = 'Unknown';
    let version = '0';
    let isSupported = false;

    // Chrome
    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
      name = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? match[1] : '0';
      isSupported = parseInt(version) >= 90;
    }
    // Edge (Chromium)
    else if (userAgent.indexOf('Edg') > -1) {
      name = 'Edge';
      const match = userAgent.match(/Edg\/(\d+)/);
      version = match ? match[1] : '0';
      isSupported = parseInt(version) >= 90;
    }
    // Firefox
    else if (userAgent.indexOf('Firefox') > -1) {
      name = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? match[1] : '0';
      isSupported = parseInt(version) >= 88;
    }
    // Safari
    else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
      name = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? match[1] : '0';
      isSupported = parseInt(version) >= 14;
    }
    // Internet Explorer
    else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
      name = 'Internet Explorer';
      const match = userAgent.match(/(?:MSIE |rv:)(\d+)/);
      version = match ? match[1] : '0';
      isSupported = false; // IE is no longer supported
    }

    return { name, version, isSupported };
  }

  openBrowserLink(url: string): void {
    window.open(url, '_blank');
  }
}

