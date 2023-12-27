import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'progressive-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progressive-image.component.html',
  styleUrl: './progressive-image.component.scss'
})
export class ProgressiveImageComponent {
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) imageUrlSmall!: string;

  isLoaded = false;

  onImageLoad() {
    this.isLoaded = true;
  }
}
