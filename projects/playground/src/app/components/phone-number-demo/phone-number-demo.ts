// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PhoneNumberComponent } from 'components';

@Component({
  selector: 'app-phone-number-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, PhoneNumberComponent],
  templateUrl: './phone-number-demo.html',
  styleUrls: ['./phone-number-demo.scss']
})
export class PhoneNumberDemoComponent {
  phoneControl = new FormControl();

  constructor() {
    this.phoneControl.valueChanges.subscribe(value => {
      console.log('Phone number:', value);
    });
  }
}
