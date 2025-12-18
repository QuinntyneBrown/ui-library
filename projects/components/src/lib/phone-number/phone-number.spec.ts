// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PhoneNumberComponent } from './phone-number';

describe('PhoneNumberComponent', () => {
  let component: PhoneNumberComponent;
  let fixture: ComponentFixture<PhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhoneNumberComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default country code +1', () => {
    expect(component.countryCodeControl.value).toBe('+1');
  });

  it('should initialize with empty number', () => {
    expect(component.numberControl.value).toBe('');
  });

  it('should implement ControlValueAccessor', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.setDisabledState).toBeDefined();
  });

  it('should implement MatFormFieldControl', () => {
    expect(component.stateChanges).toBeDefined();
    expect(component.value).toBeDefined();
    expect(component.setDescribedByIds).toBeDefined();
    expect(component.onContainerClick).toBeDefined();
  });

  it('should write value to controls', () => {
    const phoneNumber = { countryCode: '+44', number: '1234567890' };
    component.writeValue(phoneNumber);
    
    expect(component.countryCodeControl.value).toBe('+44');
    expect(component.numberControl.value).toBe('1234567890');
  });

  it('should return null value when controls are empty', () => {
    component.numberControl.setValue('');
    expect(component.value).toBeNull();
  });

  it('should return phone number value when controls have values', () => {
    component.countryCodeControl.setValue('+1');
    component.numberControl.setValue('5551234567');
    
    const value = component.value;
    expect(value).toEqual({ countryCode: '+1', number: '5551234567' });
  });

  it('should register onChange callback', () => {
    const callback = jasmine.createSpy('onChange');
    component.registerOnChange(callback);
    
    component.numberControl.setValue('1234567890');
    
    expect(callback).toHaveBeenCalled();
  });

  it('should register onTouched callback', () => {
    const callback = jasmine.createSpy('onTouched');
    component.registerOnTouched(callback);
    
    component.handleInput();
    
    expect(callback).toHaveBeenCalled();
  });

  it('should disable controls when setDisabledState is true', () => {
    component.setDisabledState(true);
    
    expect(component.countryCodeControl.disabled).toBeTrue();
    expect(component.numberControl.disabled).toBeTrue();
  });

  it('should enable controls when setDisabledState is false', () => {
    component.setDisabledState(false);
    
    expect(component.countryCodeControl.enabled).toBeTrue();
    expect(component.numberControl.enabled).toBeTrue();
  });

  it('should accept placeholder input', () => {
    component.placeholder = '555-1234';
    fixture.detectChanges();
    
    expect(component.placeholder).toBe('555-1234');
  });

  it('should accept required input', () => {
    component.required = true;
    fixture.detectChanges();
    
    expect(component.required).toBeTrue();
  });

  it('should accept disabled input', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    expect(component.disabled).toBeTrue();
  });

  it('should return true for empty when controls are empty', () => {
    component.countryCodeControl.setValue('');
    component.numberControl.setValue('');
    
    expect(component.empty).toBeTrue();
  });

  it('should return false for empty when controls have values', () => {
    component.countryCodeControl.setValue('+1');
    component.numberControl.setValue('1234567890');
    
    expect(component.empty).toBeFalse();
  });

  it('should return true for shouldLabelFloat when focused', () => {
    component.focused = true;
    
    expect(component.shouldLabelFloat).toBeTrue();
  });

  it('should return true for shouldLabelFloat when not empty', () => {
    component.focused = false;
    component.numberControl.setValue('1234567890');
    
    expect(component.shouldLabelFloat).toBeTrue();
  });

  it('should return false for shouldLabelFloat when not focused and empty', () => {
    component.focused = false;
    component.numberControl.setValue('');
    
    expect(component.shouldLabelFloat).toBeFalse();
  });

  it('should set touched to true when handleInput is called', () => {
    component.touched = false;
    component.handleInput();
    
    expect(component.touched).toBeTrue();
  });

  it('should have default country codes list', () => {
    expect(component.countryCodes.length).toBeGreaterThan(0);
    expect(component.countryCodes[0].code).toBe('+1');
  });

  it('should display country code select', () => {
    const select = fixture.nativeElement.querySelector('.phone-number__country-code');
    expect(select).toBeTruthy();
  });

  it('should display phone number input', () => {
    const input = fixture.nativeElement.querySelector('.phone-number__input');
    expect(input).toBeTruthy();
  });

  it('should set input type to tel', () => {
    const input = fixture.nativeElement.querySelector('.phone-number__input');
    expect(input.type).toBe('tel');
  });

  it('should display placeholder on input', () => {
    component.placeholder = '555-1234';
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('.phone-number__input');
    expect(input.placeholder).toBe('555-1234');
  });

  it('should emit state changes when value changes', () => {
    spyOn(component.stateChanges, 'next');
    
    component.numberControl.setValue('1234567890');
    
    expect(component.stateChanges.next).toHaveBeenCalled();
  });

  it('should emit state changes when placeholder changes', () => {
    spyOn(component.stateChanges, 'next');
    
    component.placeholder = 'New placeholder';
    
    expect(component.stateChanges.next).toHaveBeenCalled();
  });

  it('should emit state changes when required changes', () => {
    spyOn(component.stateChanges, 'next');
    
    component.required = true;
    
    expect(component.stateChanges.next).toHaveBeenCalled();
  });

  it('should emit state changes when disabled changes', () => {
    spyOn(component.stateChanges, 'next');
    
    component.disabled = true;
    
    expect(component.stateChanges.next).toHaveBeenCalled();
  });

  it('should set describedBy when setDescribedByIds is called', () => {
    component.setDescribedByIds(['id1', 'id2']);
    
    expect(component.describedBy).toBe('id1 id2');
  });

  it('should have unique id', () => {
    const component2 = new PhoneNumberComponent(
      TestBed.inject(FocusMonitor),
      TestBed.inject(ElementRef),
      null
    );
    
    expect(component.id).not.toBe(component2.id);
  });

  it('should have controlType set to q-phone-number', () => {
    expect(component.controlType).toBe('q-phone-number');
  });

  it('should clean up on destroy', () => {
    spyOn(component.stateChanges, 'complete');
    
    component.ngOnDestroy();
    
    expect(component.stateChanges.complete).toHaveBeenCalled();
  });

  it('should return errorState based on touched and validity', () => {
    component.touched = true;
    component.numberControl.setErrors({ invalid: true });
    
    expect(component.errorState).toBeTrue();
  });

  it('should not show error when not touched', () => {
    component.touched = false;
    component.numberControl.setErrors({ invalid: true });
    
    expect(component.errorState).toBeFalse();
  });
});


