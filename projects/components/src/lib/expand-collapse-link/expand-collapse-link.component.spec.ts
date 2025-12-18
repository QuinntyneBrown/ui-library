import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpandCollapseLinkComponent } from './expand-collapse-link.component';

describe('ExpandCollapseLinkComponent', () => {
  let component: ExpandCollapseLinkComponent;
  let fixture: ComponentFixture<ExpandCollapseLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandCollapseLinkComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpandCollapseLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show default onCaption initially', () => {
    expect(component.caption).toBe('Read More');
  });

  it('should toggle caption on click', () => {
    component.handleClick();
    expect(component.caption).toBe('Show Less');
    component.handleClick();
    expect(component.caption).toBe('Read More');
  });

  it('should emit expandCollapseClick event with correct state', () => {
    spyOn(component.expandCollapseClick, 'emit');
    component.handleClick();
    expect(component.expandCollapseClick.emit).toHaveBeenCalledWith(true);
    component.handleClick();
    expect(component.expandCollapseClick.emit).toHaveBeenCalledWith(false);
  });

  it('should use custom captions when provided', () => {
    component.onCaption = 'Expand';
    component.offCaption = 'Collapse';
    expect(component.caption).toBe('Expand');
    component.handleClick();
    expect(component.caption).toBe('Collapse');
  });

  it('should render link with correct text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('.expand-collapse-link');
    expect(link?.textContent?.trim()).toBe('Read More');
  });

  it('should update link text on click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('.expand-collapse-link') as HTMLElement;
    link.click();
    fixture.detectChanges();
    expect(link.textContent?.trim()).toBe('Show Less');
  });
});
