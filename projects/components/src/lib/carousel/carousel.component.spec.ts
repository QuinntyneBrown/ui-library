import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent, MatButtonModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.items = [
      { content: 'Item 1' },
      { content: 'Item 2' },
      { content: 'Item 3' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default configuration', () => {
    expect(component.mergedConfig.margin).toBe(10);
    expect(component.mergedConfig.nav).toBe(true);
    expect(component.mergedConfig.loop).toBe(true);
  });

  it('should detect single item carousel', () => {
    component.items = [{ content: 'Single Item' }];
    expect(component.isSingleItem).toBe(true);
  });

  it('should detect multiple items carousel', () => {
    expect(component.isSingleItem).toBe(false);
  });

  it('should navigate to next item', () => {
    const initialIndex = component.currentIndex;
    component.next();
    expect(component.currentIndex).toBe(initialIndex + 1);
  });

  it('should navigate to previous item', () => {
    component.currentIndex = 1;
    component.previous();
    expect(component.currentIndex).toBe(0);
  });

  it('should loop to first item when at end and loop is enabled', () => {
    component.currentIndex = component.items.length - 1;
    component.next();
    expect(component.currentIndex).toBe(0);
  });

  it('should update items per view based on window width', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
    component.updateItemsPerView();
    expect(component.itemsPerView).toBe(3);
  });

  it('should disable previous button when at start and loop is disabled', () => {
    component.mergedConfig.loop = false;
    component.currentIndex = 0;
    expect(component.canGoPrevious).toBe(false);
  });

  it('should disable next button when at end and loop is disabled', () => {
    component.mergedConfig.loop = false;
    component.itemsPerView = 1;
    component.currentIndex = component.items.length - 1;
    expect(component.canGoNext).toBe(false);
  });
});
