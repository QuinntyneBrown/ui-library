// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent, CarouselItem, CarouselConfig } from 'components';

@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './carousel-demo.html',
  styleUrls: ['./carousel-demo.scss']
})
export class CarouselDemoComponent {
  items: CarouselItem[] = [
    { content: 'Slide 1 Content' },
    { content: 'Slide 2 Content' },
    { content: 'Slide 3 Content' },
    { content: 'Slide 4 Content' },
    { content: 'Slide 5 Content' }
  ];

  config: CarouselConfig = {
    margin: 10,
    nav: true,
    loop: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  };
}
