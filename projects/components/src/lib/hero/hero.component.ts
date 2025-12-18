import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'q-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() makeLogo?: string;
  @Input() makeAndModel?: string;
  @Input() msrp?: number;
  @Input() carImage?: string;
  @Input() score?: number;
  @Input() ownerScore?: number;

  ngOnInit(): void {
  }

  onFindCarsClick(): void {
    // Implement find cars logic
  }

  onCompareClick(): void {
    // Implement compare logic
  }
}
