import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';
import { DraggableDirective } from '../../directives/draggable.directive';
import { EllipsisDirective } from '../../directives/ellipsis.directive';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-lazy-image',
  standalone: true,
  imports: [CommonModule,LazyLoadDirective,DraggableDirective,EllipsisDirective,ClickOutsideDirective],
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent {

  dropdownOpen = false;
  closeDropdown() {
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
