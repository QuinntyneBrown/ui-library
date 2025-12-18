// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Routes } from '@angular/router';
import { ComponentsComponent } from './components/components';
import { ForgotPasswordDemoComponent } from './components/forgot-password-demo/forgot-password-demo';
import { ResetPasswordDemoComponent } from './components/reset-password-demo/reset-password-demo';
import { LoginDemoComponent } from './components/login-demo/login-demo';
import { ReLoginDemoComponent } from './components/re-login-demo/re-login-demo';
import { ImageUploadDemoComponent } from './components/image-upload-demo/image-upload-demo';
import { LoadingBarDemoComponent } from './components/loading-bar-demo/loading-bar-demo';
import { PhoneNumberDemoComponent } from './components/phone-number-demo/phone-number-demo';
import { UnsupportedBrowserDemoComponent } from './components/unsupported-browser-demo/unsupported-browser-demo';
import { LocalizedDemoComponent } from './components/localized-demo/localized-demo';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components',
    pathMatch: 'full'
  },
  {
    path: 'components',
    component: ComponentsComponent,
    children: [
      { path: '', redirectTo: 'forgot-password', pathMatch: 'full' },
      { path: 'forgot-password', component: ForgotPasswordDemoComponent },
      { path: 'reset-password', component: ResetPasswordDemoComponent },
      { path: 'login', component: LoginDemoComponent },
      { path: 're-login', component: ReLoginDemoComponent },
      { path: 'image-upload', component: ImageUploadDemoComponent },
      { path: 'loading-bar', component: LoadingBarDemoComponent },
      { path: 'phone-number', component: PhoneNumberDemoComponent },
      { path: 'unsupported-browser', component: UnsupportedBrowserDemoComponent },
      { path: 'localized', component: LocalizedDemoComponent }
    ]
  }
];
