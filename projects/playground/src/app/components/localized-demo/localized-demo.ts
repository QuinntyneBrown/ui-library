// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocalizedComponent } from 'components';

@Component({
  selector: 'app-localized-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizedComponent],
  templateUrl: './localized-demo.html',
  styleUrls: ['./localized-demo.scss']
})
export class LocalizedDemoComponent {
  localizedControl = new FormControl();

  constructor() {
    this.localizedControl.valueChanges.subscribe(value => {
      console.log('Localized value:', value);
    });
  }
}
