import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'q-expand-collapse-link',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './expand-collapse-link.component.html',
  styleUrls: ['./expand-collapse-link.component.scss']
})
export class ExpandCollapseLinkComponent {
  @Input() onCaption: string = 'Read More';
  @Input() offCaption: string = 'Show Less';
  @Output() expandCollapseClick = new EventEmitter<boolean>();

  isOpen = false;

  get caption(): string {
    return this.isOpen ? this.offCaption : this.onCaption;
  }

  handleClick(): void {
    this.isOpen = !this.isOpen;
    this.expandCollapseClick.emit(this.isOpen);
  }
}
