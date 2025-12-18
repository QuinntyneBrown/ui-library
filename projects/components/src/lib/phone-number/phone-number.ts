// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  Validators,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

export interface PhoneNumber {
  countryCode: string;
  number: string;
}

@Component({
  selector: 'q-phone-number',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberComponent),
      multi: true
    },
    {
      provide: MatFormFieldControl,
      useExisting: PhoneNumberComponent
    }
  ],
  templateUrl: './phone-number.html',
  styleUrls: ['./phone-number.scss'],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class PhoneNumberComponent
  implements ControlValueAccessor, MatFormFieldControl<PhoneNumber>, OnInit, OnDestroy
{
  static nextId = 0;

  @ViewChild('numberInput') numberInput!: ElementRef<HTMLInputElement>;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.countryCodeControl.disable();
      this.numberControl.disable();
    } else {
      this.countryCodeControl.enable();
      this.numberControl.enable();
    }
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): PhoneNumber | null {
    const countryCode = this.countryCodeControl.value;
    const number = this.numberControl.value;
    if (countryCode && number) {
      return { countryCode, number };
    }
    return null;
  }
  set value(phoneNumber: PhoneNumber | null) {
    if (phoneNumber) {
      this.countryCodeControl.setValue(phoneNumber.countryCode);
      this.numberControl.setValue(phoneNumber.number);
    } else {
      this.countryCodeControl.setValue('+1');
      this.numberControl.setValue('');
    }
    this.stateChanges.next();
  }

  stateChanges = new Subject<void>();
  id = `q-phone-number-${PhoneNumberComponent.nextId++}`;
  focused = false;
  touched = false;
  controlType = 'q-phone-number';
  describedBy = '';

  countryCodeControl = new FormControl('+1');
  numberControl = new FormControl('');

  countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+33', country: 'FR' },
    { code: '+49', country: 'DE' },
    { code: '+61', country: 'AU' },
    { code: '+81', country: 'JP' },
    { code: '+86', country: 'CN' }
  ];

  private onChange: (value: PhoneNumber | null) => void = () => {};
  private onTouched: () => void = () => {};

  get empty(): boolean {
    return !this.countryCodeControl.value && !this.numberControl.value;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return this.numberControl.invalid && this.touched;
  }

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    focusMonitor.monitor(elementRef, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit(): void {
    this.numberControl.valueChanges.subscribe(() => {
      this.onChange(this.value);
      this.stateChanges.next();
    });

    this.countryCodeControl.valueChanges.subscribe(() => {
      this.onChange(this.value);
      this.stateChanges.next();
    });
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  writeValue(phoneNumber: PhoneNumber | null): void {
    this.value = phoneNumber;
  }

  registerOnChange(fn: (value: PhoneNumber | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(): void {
    if (!this.focused) {
      this.numberInput?.nativeElement.focus();
    }
  }

  handleInput(): void {
    this.touched = true;
    this.onTouched();
  }
}

