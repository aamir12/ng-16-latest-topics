import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressiveImageComponent } from './progressive-image/progressive-image.component';

@Component({
  selector: 'app-lazy-load-image',
  standalone: true,
  imports: [CommonModule,ProgressiveImageComponent],
  templateUrl: './lazy-load-image.component.html',
  styleUrl: './lazy-load-image.component.scss'
})
export class LazyLoadImageComponent {

}
