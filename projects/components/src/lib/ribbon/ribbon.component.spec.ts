import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RibbonComponent, RibbonItem } from './ribbon.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('RibbonComponent', () => {
  let component: RibbonComponent;
  let fixture: ComponentFixture<RibbonComponent>;
  const mockItems: RibbonItem[] = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonComponent, MatButtonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RibbonComponent);
    component = fixture.componentInstance;
    component.items = mockItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set first item as active on init', () => {
    expect(component.activeItem).toBe(mockItems[0]);
  });

  it('should emit itemClick event when item is clicked', () => {
    spyOn(component.itemClick, 'emit');
    component.onItemClick(mockItems[1]);
    expect(component.itemClick.emit).toHaveBeenCalledWith(mockItems[1]);
  });

  it('should set active item when clicked', () => {
    component.onItemClick(mockItems[1]);
    expect(component.activeItem).toBe(mockItems[1]);
  });

  it('should handle next navigation', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    const initialTranslateX = component.translateX;
    component.handleNext();
    expect(component.translateX).toBeGreaterThan(initialTranslateX);
  });

  it('should handle previous navigation', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    component.translateX = 100;
    component.handlePrevious();
    expect(component.translateX).toBe(0);
  });

  it('should reset translateX on resize', () => {
    component.translateX = 100;
    component.onResize();
    expect(component.translateX).toBe(0);
  });

  it('should detect scroll enabled state based on window width', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    expect(component.scrollEnabled).toBe(true);

    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
    expect(component.scrollEnabled).toBe(false);
  });

  it('should handle touch start', () => {
    const touchEvent = new TouchEvent('touchstart', {
      touches: [{ pageX: 100 } as Touch]
    });
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    component.onTouchStart(touchEvent);
    expect(component['touchStartX']).toBe(100);
  });

  it('should not allow previous when at start', () => {
    component.translateX = 0;
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    expect(component.canGoPrevious).toBe(false);
  });

  it('should render all ribbon items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.ribbon__item');
    expect(items.length).toBe(3);
  });
});
