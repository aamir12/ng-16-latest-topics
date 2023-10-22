import { Directive, ElementRef, HostListener, NgZone, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone:true,
})
export class LazyLoadDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
      if (this.isElementInViewport()) {
        this.loadImage();
      }
  }

  private isElementInViewport(): boolean {
    console.log("isElementInViewport");
    const rect = this.el.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  private loadImage() {
    const dataSrc = this.el.nativeElement.getAttribute('data-src');
    console.log(dataSrc);
    if (dataSrc) {
      this.renderer.setAttribute(this.el.nativeElement, 'src', dataSrc);
      this.el.nativeElement.removeAttribute('data-src');
    }
  }
}