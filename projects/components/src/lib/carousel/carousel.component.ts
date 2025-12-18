import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface CarouselItem {
  content: any;
}

export interface CarouselConfig {
  margin?: number;
  nav?: boolean;
  loop?: boolean;
  dots?: boolean;
  stagePadding?: number;
  responsive?: {
    [breakpoint: number]: {
      items: number;
    };
  };
}

@Component({
  selector: 'q-carousel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() items: CarouselItem[] = [];
  @Input() config: CarouselConfig = {};
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;

  currentIndex = 0;
  itemsPerView = 1;
  translateX = 0;

  defaultConfig: CarouselConfig = {
    margin: 10,
    nav: true,
    loop: true,
    dots: false,
    stagePadding: 0,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
      1200: { items: 3 }
    }
  };

  mergedConfig!: CarouselConfig;

  ngOnInit(): void {
    this.mergedConfig = { ...this.defaultConfig, ...this.config };
    this.updateItemsPerView();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', () => this.updateItemsPerView());
  }

  updateItemsPerView(): void {
    const width = window.innerWidth;
    const responsive = this.mergedConfig.responsive!;
    const breakpoints = Object.keys(responsive)
      .map(Number)
      .sort((a, b) => b - a);

    for (const breakpoint of breakpoints) {
      if (width >= breakpoint) {
        this.itemsPerView = responsive[breakpoint].items;
        break;
      }
    }
  }

  get canGoPrevious(): boolean {
    return this.mergedConfig.loop || this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.mergedConfig.loop || this.currentIndex < this.items.length - this.itemsPerView;
  }

  previous(): void {
    if (this.canGoPrevious) {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - this.itemsPerView;
      this.updateTranslate();
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex = this.currentIndex < this.items.length - this.itemsPerView ? this.currentIndex + 1 : 0;
      this.updateTranslate();
    }
  }

  updateTranslate(): void {
    const itemWidth = 100 / this.itemsPerView;
    this.translateX = -(this.currentIndex * itemWidth);
  }

  get isSingleItem(): boolean {
    return this.items.length === 1;
  }
}
