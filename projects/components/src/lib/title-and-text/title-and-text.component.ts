import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandCollapseLinkComponent } from '../expand-collapse-link/expand-collapse-link.component';

@Component({
  selector: 'lib-title-and-text',
  standalone: true,
  imports: [CommonModule, ExpandCollapseLinkComponent],
  templateUrl: './title-and-text.component.html',
  styleUrls: ['./title-and-text.component.scss']
})
export class TitleAndTextComponent {
  @Input() title?: string;
  @Input() text?: string;
  @Input() showExpandLink = true;

  isTruncated = true;

  handleExpandCollapse(isOpen: boolean): void {
    this.isTruncated = !isOpen;
  }
}
