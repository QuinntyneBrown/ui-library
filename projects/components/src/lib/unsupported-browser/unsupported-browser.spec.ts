// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UnsupportedBrowserComponent } from './unsupported-browser';

describe('UnsupportedBrowserComponent', () => {
  let component: UnsupportedBrowserComponent;
  let fixture: ComponentFixture<UnsupportedBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UnsupportedBrowserComponent,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UnsupportedBrowserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize browserInfo on ngOnInit', () => {
    component.ngOnInit();
    
    expect(component.browserInfo).toBeDefined();
    expect(component.browserInfo.name).toBeDefined();
    expect(component.browserInfo.version).toBeDefined();
    expect(component.browserInfo.isSupported).toBeDefined();
  });

  it('should have list of supported browsers', () => {
    expect(component.supportedBrowsers).toBeDefined();
    expect(component.supportedBrowsers.length).toBeGreaterThan(0);
  });

  it('should include Chrome in supported browsers', () => {
    const chrome = component.supportedBrowsers.find(b => b.name.includes('Chrome'));
    expect(chrome).toBeDefined();
    expect(chrome?.url).toContain('chrome');
  });

  it('should include Firefox in supported browsers', () => {
    const firefox = component.supportedBrowsers.find(b => b.name.includes('Firefox'));
    expect(firefox).toBeDefined();
    expect(firefox?.url).toContain('firefox');
  });

  it('should include Edge in supported browsers', () => {
    const edge = component.supportedBrowsers.find(b => b.name.includes('Edge'));
    expect(edge).toBeDefined();
    expect(edge?.url).toContain('edge');
  });

  it('should include Safari in supported browsers', () => {
    const safari = component.supportedBrowsers.find(b => b.name.includes('Safari'));
    expect(safari).toBeDefined();
    expect(safari?.url).toContain('safari');
  });

  it('should detect browser information', () => {
    fixture.detectChanges();
    
    expect(component.browserInfo.name).toBeTruthy();
    expect(component.browserInfo.version).toBeTruthy();
  });

  it('should open browser link in new tab', () => {
    spyOn(window, 'open');
    
    const url = 'https://www.google.com/chrome/';
    component.openBrowserLink(url);
    
    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });

  it('should not display component when browser is supported', () => {
    component.browserInfo.isSupported = true;
    fixture.detectChanges();
    
    const container = fixture.nativeElement.querySelector('.unsupported-browser');
    expect(container).toBeFalsy();
  });

  it('should display component when browser is not supported', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const container = fixture.nativeElement.querySelector('.unsupported-browser');
    expect(container).toBeTruthy();
  });

  it('should display warning icon', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('.unsupported-browser__icon');
    expect(icon).toBeTruthy();
    expect(icon.textContent).toContain('warning');
  });

  it('should display title', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('.unsupported-browser__title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Unsupported Browser');
  });

  it('should display browser name and version', () => {
    component.browserInfo = { name: 'TestBrowser', version: '1.0', isSupported: false };
    fixture.detectChanges();
    
    const message = fixture.nativeElement.querySelector('.unsupported-browser__message');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('TestBrowser');
    expect(message.textContent).toContain('1.0');
  });

  it('should display all supported browsers', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const browsers = fixture.nativeElement.querySelectorAll('.unsupported-browser__browser');
    expect(browsers.length).toBe(component.supportedBrowsers.length);
  });

  it('should display download buttons for each browser', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.unsupported-browser__button');
    expect(buttons.length).toBe(component.supportedBrowsers.length);
  });

  it('should display upgrade note', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const note = fixture.nativeElement.querySelector('.unsupported-browser__note');
    expect(note).toBeTruthy();
    expect(note.textContent).toContain('refresh');
  });

  it('should detect Chrome correctly', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      writable: true,
      configurable: true
    });

    component.ngOnInit();
    
    expect(component.browserInfo.name).toBe('Chrome');
    expect(parseInt(component.browserInfo.version)).toBeGreaterThan(0);
  });

  it('should detect Firefox correctly', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      writable: true,
      configurable: true
    });

    component.ngOnInit();
    
    expect(component.browserInfo.name).toBe('Firefox');
    expect(parseInt(component.browserInfo.version)).toBeGreaterThan(0);
  });

  it('should detect Edge correctly', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.44';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      writable: true,
      configurable: true
    });

    component.ngOnInit();
    
    expect(component.browserInfo.name).toBe('Edge');
    expect(parseInt(component.browserInfo.version)).toBeGreaterThan(0);
  });

  it('should mark IE as unsupported', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      writable: true,
      configurable: true
    });

    component.ngOnInit();
    
    expect(component.browserInfo.name).toBe('Internet Explorer');
    expect(component.browserInfo.isSupported).toBeFalse();
  });

  it('should display divider', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const divider = fixture.nativeElement.querySelector('.unsupported-browser__divider');
    expect(divider).toBeTruthy();
  });

  it('should have browser icons', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const icons = fixture.nativeElement.querySelectorAll('.unsupported-browser__browser-icon');
    expect(icons.length).toBe(component.supportedBrowsers.length);
  });

  it('should have browser names', () => {
    component.browserInfo.isSupported = false;
    fixture.detectChanges();
    
    const names = fixture.nativeElement.querySelectorAll('.unsupported-browser__browser-name');
    expect(names.length).toBe(component.supportedBrowsers.length);
  });
});


