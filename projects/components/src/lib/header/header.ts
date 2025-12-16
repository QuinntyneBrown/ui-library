import { Component, Input } from '@angular/core';

@Component({
  selector: 'q-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() title = '';
  @Input() sticky = true;
}
