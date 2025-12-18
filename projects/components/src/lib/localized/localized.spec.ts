// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QLocalizedComponent } from './q-localized';

@Component({
  template: `
    <q-localized [formControl]="control">
      <ng-template let-cultureCode="cultureCode">
        <input 
          [formControl]="getFormControl(cultureCode)"
          [attr.data-culture]="cultureCode"
          type="text" />
      </ng-template>
    </q-localized>
  `
})
class TestHostComponent {
  control = new FormControl();
  
  getFormControl(cultureCode: string): FormControl {
    return this.control.value?.[cultureCode] || new FormControl();
  }
}

describe('QLocalizedComponent', () => {
  let component: QLocalizedComponent;
  let fixture: ComponentFixture<QLocalizedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QLocalizedComponent, TestHostComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QLocalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default culture codes', () => {
    expect(component.cultureCodes).toContain('en-CA');
    expect(component.cultureCodes).toContain('fr-CA');
  });

  it('should create form controls for each culture code', () => {
    component.cultureCodes.forEach(code => {
      expect(component.form.get(code)).toBeTruthy();
    });
  });

  it('should display culture labels correctly', () => {
    expect(component.displayWith('en-CA')).toBe('English (Canada)');
    expect(component.displayWith('fr-CA')).toBe('Français (Canada)');
  });

  describe('writeValue', () => {
    it('should handle object input', () => {
      const testValue = {
        'en-CA': 'English text',
        'fr-CA': 'Texte français'
      };
      
      component.writeValue(testValue);
      
      expect(component.form.get('en-CA')?.value).toBe('English text');
      expect(component.form.get('fr-CA')?.value).toBe('Texte français');
    });

    it('should handle array input', () => {
      const testValue = [
        { cultureCode: 'en-CA', value: 'English text' },
        { cultureCode: 'fr-CA', value: 'Texte français' }
      ];
      
      component.writeValue(testValue);
      
      expect(component.isArray).toBe(true);
      expect(component.form.get('en-CA')?.value).toBe('English text');
      expect(component.form.get('fr-CA')?.value).toBe('Texte français');
    });

    it('should handle null input', () => {
      component.writeValue(null);
      expect(component.form.get('en-CA')?.value).toBeFalsy();
    });
  });

  describe('registerOnChange', () => {
    it('should emit object format when not array', () => {
      let emittedValue: any;
      component.registerOnChange((value: any) => {
        emittedValue = value;
      });

      component.form.get('en-CA')?.setValue('Test');
      
      expect(emittedValue).toBeTruthy();
      expect(emittedValue['en-CA']).toBe('Test');
    });

    it('should emit array format when isArray is true', () => {
      component.isArray = true;
      let emittedValue: any;
      
      component.registerOnChange((value: any) => {
        emittedValue = value;
      });

      component.form.get('en-CA')?.setValue('Test');
      
      expect(Array.isArray(emittedValue)).toBe(true);
      expect(emittedValue.find((x: any) => x.cultureCode === 'en-CA')?.value).toBe('Test');
    });
  });

  describe('validate', () => {
    it('should return null when control value is null', () => {
      const control = new FormControl(null);
      expect(component.validate(control)).toBeNull();
    });

    it('should return error when no values are set', () => {
      const control = new FormControl({});
      component.writeValue({});
      
      const result = component.validate(control);
      expect(result).toEqual({ required: true });
    });

    it('should return null when at least one value is set', () => {
      const control = new FormControl({ 'en-CA': 'Test' });
      component.writeValue({ 'en-CA': 'Test' });
      
      const result = component.validate(control);
      expect(result).toBeNull();
    });
  });

  describe('hasValue', () => {
    it('should return true when culture has value', () => {
      component.form.get('en-CA')?.setValue('Test');
      expect(component.hasValue('en-CA')).toBe(true);
    });

    it('should return false when culture has no value', () => {
      component.form.get('en-CA')?.setValue('');
      expect(component.hasValue('en-CA')).toBe(false);
    });

    it('should return false when culture has only whitespace', () => {
      component.form.get('en-CA')?.setValue('   ');
      expect(component.hasValue('en-CA')).toBe(false);
    });
  });

  describe('getCultureLabel', () => {
    it('should return formatted label for known cultures', () => {
      expect(component.getCultureLabel('en-CA')).toBe('English (Canada)');
      expect(component.getCultureLabel('fr-CA')).toBe('Français (Canada)');
    });

    it('should return code for unknown cultures', () => {
      expect(component.getCultureLabel('de-DE')).toBe('de-DE');
    });
  });

  describe('lifecycle hooks', () => {
    it('should call ngAfterViewInit without errors', () => {
      expect(() => component.ngAfterViewInit()).not.toThrow();
    });

    it('should call ngOnDestroy and complete subject', () => {
      const nextSpy = spyOn<any>(component['_destroyed$'], 'next');
      const completeSpy = spyOn<any>(component['_destroyed$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('touch handling', () => {
    it('should register onTouched callback', () => {
      const touchFn = jasmine.createSpy('touchFn');
      component.registerOnTouched(touchFn);
      
      component.onTouched();
      expect(touchFn).toHaveBeenCalled();
    });
  });

  describe('integration with host component', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('should integrate with form control', () => {
      const testValue = { 'en-CA': 'Test', 'fr-CA': 'Teste' };
      hostComponent.control.setValue(testValue);
      hostFixture.detectChanges();
      
      expect(hostComponent.control.value).toBeTruthy();
    });
  });
});

