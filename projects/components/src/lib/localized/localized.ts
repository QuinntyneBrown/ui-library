// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ReactiveFormsModule
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export interface CultureCode {
  code: string;
  label: string;
}

@Component({
  selector: 'q-localized',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './localized.html',
  styleUrls: ['./localized.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocalizedComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LocalizedComponent),
      multi: true
    }
  ]
})
export class LocalizedComponent
  implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy {
  private readonly _destroyed$: Subject<void> = new Subject();

  @ContentChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;

  public cultureCodes: string[] = this.getDefaultCultureCodes();
  private _originalValue: any;
  private _dirty = false;

  public form = this.cultureCodes.reduce((formGroup, cultureCode) => {
    formGroup.addControl(cultureCode, new FormControl());
    return formGroup;
  }, new FormGroup({}));

  public isArray = false;

  constructor(private readonly _elementRef: ElementRef) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    const hasValues = this.cultureCodes.some(code => {
      const formValue = this.form.get(code)?.value;
      return formValue && formValue.trim() !== '';
    });

    if (!hasValues) {
      return { required: true };
    }

    return null;
  }

  writeValue(obj: any): void {
    if (obj == null) {
      return;
    }

    this._originalValue = JSON.parse(JSON.stringify(obj));

    if (Array.isArray(obj)) {
      this.isArray = true;
      for (const cultureCode of this.cultureCodes) {
        const item = obj.find(x => x.cultureCode === cultureCode);
        this.form.get(cultureCode)?.setValue(item?.value || '');
      }
    } else {
      this.isArray = false;
      for (const cultureCode of this.cultureCodes) {
        this.form.get(cultureCode)?.setValue(obj[cultureCode] || '');
      }
    }

    this._dirty = false;
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(() => {
      this._dirty = true;
      
      if (this.isArray) {
        const result: Array<{ cultureCode: string; value: string }> = [];
        for (const cultureCode of this.cultureCodes) {
          const value = this.form.get(cultureCode)?.value;
          if (value) {
            result.push({ cultureCode, value });
          }
        }
        fn(result);
      } else {
        const result: { [key: string]: string } = {};
        for (const cultureCode of this.cultureCodes) {
          result[cultureCode] = this.form.get(cultureCode)?.value || '';
        }
        fn(result);
      }
    });
  }

  onTouched = () => {};

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    this._elementRef.nativeElement
      .querySelectorAll('*')
      .forEach((element: HTMLElement) => {
        fromEvent(element, 'blur')
          .pipe(
            takeUntil(this._destroyed$),
            tap(() => this.onTouched())
          )
          .subscribe();
      });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public displayWith(cultureCode: string): string {
    const cultureLabels: { [key: string]: string } = {
      'en-CA': 'English (Canada)',
      'fr-CA': 'Français (Canada)',
      'en-US': 'English (United States)',
      'es-ES': 'Español (España)'
    };
    
    return cultureLabels[cultureCode] || cultureCode;
  }

  private getDefaultCultureCodes(): string[] {
    return ['en-CA', 'fr-CA'];
  }

  public getCultureLabel(code: string): string {
    return this.displayWith(code);
  }

  public hasValue(cultureCode: string): boolean {
    const value = this.form.get(cultureCode)?.value;
    return value && value.trim() !== '';
  }
}


