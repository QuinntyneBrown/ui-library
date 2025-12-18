import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleAndTextComponent } from './title-and-text.component';
import { ExpandCollapseLinkComponent } from '../expand-collapse-link/expand-collapse-link.component';

describe('TitleAndTextComponent', () => {
  let component: TitleAndTextComponent;
  let fixture: ComponentFixture<TitleAndTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleAndTextComponent, ExpandCollapseLinkComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TitleAndTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title when provided', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title-and-text__title')?.textContent).toBe('Test Title');
  });

  it('should display text when provided', () => {
    component.text = 'Test text content';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title-and-text__text')?.textContent).toContain('Test text content');
  });

  it('should start with truncated state', () => {
    expect(component.isTruncated).toBe(true);
  });

  it('should toggle truncated state on expand/collapse', () => {
    component.handleExpandCollapse(true);
    expect(component.isTruncated).toBe(false);
    component.handleExpandCollapse(false);
    expect(component.isTruncated).toBe(true);
  });

  it('should show expand link by default', () => {
    expect(component.showExpandLink).toBe(true);
  });

  it('should hide expand link when showExpandLink is false', () => {
    component.showExpandLink = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('lib-expand-collapse-link')).toBeFalsy();
  });

  it('should apply truncated class when isTruncated is true', () => {
    component.isTruncated = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const textElement = compiled.querySelector('.title-and-text__text');
    expect(textElement?.classList.contains('title-and-text--truncated')).toBe(true);
  });

  it('should remove truncated class when isTruncated is false', () => {
    component.isTruncated = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const textElement = compiled.querySelector('.title-and-text__text');
    expect(textElement?.classList.contains('title-and-text--truncated')).toBe(false);
  });
});
