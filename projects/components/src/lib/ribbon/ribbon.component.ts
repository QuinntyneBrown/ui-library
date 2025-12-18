import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface RibbonItem {
  id: string;
  label: string;
  data?: any;
}

@Component({
  selector: 'q-ribbon',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.scss']
})
export class RibbonComponent implements OnInit {
  @Input() items: RibbonItem[] = [];
  @Input() gridTemplateColumns: string = '';
  @Output() itemClick = new EventEmitter<RibbonItem>();

  activeItem?: RibbonItem;
  translateX = 0;
  maxWidth = 1170;
  
  private touchStartX = 0;
  private touchMoveX = 0;
  private moveX = 0;

  ngOnInit(): void {
    if (this.items.length > 0) {
      this.activeItem = this.items[0];
    }
  }

  get scrollEnabled(): boolean {
    return window.innerWidth < this.maxWidth;
  }

  get maxTranslateX(): number {
    return this.maxWidth - this.getContainerWidth();
  }

  get canGoPrevious(): boolean {
    return this.scrollEnabled && this.translateX > 0;
  }

  get canGoNext(): boolean {
    return this.scrollEnabled && this.translateX < this.maxTranslateX;
  }

  onItemClick(item: RibbonItem): void {
    this.activeItem = item;
    this.itemClick.emit(item);
  }

  handleNext(): void {
    if (this.canGoNext) {
      this.translateX = Math.min(this.translateX + 100, this.maxTranslateX);
    }
  }

  handlePrevious(): void {
    if (this.canGoPrevious) {
      this.translateX = Math.max(this.translateX - 100, 0);
    }
  }

  onTouchStart(event: TouchEvent): void {
    if (this.scrollEnabled) {
      this.touchStartX = event.touches[0].pageX;
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.scrollEnabled) {
      this.touchMoveX = event.touches[0].pageX;
      this.moveX = this.touchStartX - this.touchMoveX;
    }
  }

  onTouchEnd(): void {
    if (this.scrollEnabled && this.moveX !== 0) {
      if (this.moveX > 0) {
        this.translateX = Math.min(this.translateX + this.moveX + 100, this.maxTranslateX);
      } else {
        this.translateX = Math.max(this.translateX + this.moveX - 100, 0);
      }
      this.moveX = 0;
    }
  }

  onResize(): void {
    this.translateX = 0;
  }

  private getContainerWidth(): number {
    return window.innerWidth;
  }
}
