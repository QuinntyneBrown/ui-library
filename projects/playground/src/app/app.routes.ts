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
import { CarouselDemoComponent } from './components/carousel-demo/carousel-demo';
import { ExpandCollapseLinkDemoComponent } from './components/expand-collapse-link-demo/expand-collapse-link-demo';
import { HeroDemoComponent } from './components/hero-demo/hero-demo';
import { HeaderDemoComponent } from './components/header-demo/header-demo';
import { RibbonDemoComponent } from './components/ribbon-demo/ribbon-demo';
import { ScoreDemoComponent } from './components/score-demo/score-demo';
import { SectionDemoComponent } from './components/section-demo/section-demo';
import { TitleAndTextDemoComponent } from './components/title-and-text-demo/title-and-text-demo';
import { VideoPlayerDemoComponent } from './components/video-player-demo/video-player-demo';

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
      { path: '', redirectTo: 'carousel', pathMatch: 'full' },
      { path: 'carousel', component: CarouselDemoComponent },
      { path: 'expand-collapse-link', component: ExpandCollapseLinkDemoComponent },
      { path: 'forgot-password', component: ForgotPasswordDemoComponent },
      { path: 'header', component: HeaderDemoComponent },
      { path: 'hero', component: HeroDemoComponent },
      { path: 'image-upload', component: ImageUploadDemoComponent },
      { path: 'loading-bar', component: LoadingBarDemoComponent },
      { path: 'localized', component: LocalizedDemoComponent },
      { path: 'login', component: LoginDemoComponent },
      { path: 'phone-number', component: PhoneNumberDemoComponent },
      { path: 're-login', component: ReLoginDemoComponent },
      { path: 'reset-password', component: ResetPasswordDemoComponent },
      { path: 'ribbon', component: RibbonDemoComponent },
      { path: 'score', component: ScoreDemoComponent },
      { path: 'section', component: SectionDemoComponent },
      { path: 'title-and-text', component: TitleAndTextDemoComponent },
      { path: 'unsupported-browser', component: UnsupportedBrowserDemoComponent },
      { path: 'video-player', component: VideoPlayerDemoComponent }
    ]
  }
];
