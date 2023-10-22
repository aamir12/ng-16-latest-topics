import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
  standalone:true
})
export class EllipsisDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkContent();
  }

  ngAfterViewInit() {
    this.checkContent();
  }

  checkContent() {
    if(!this.el.nativeElement){
      return;
    } 

    const container = this.el.nativeElement;
    const content = container.innerHTML;
    
    if (container.scrollWidth > container.clientWidth) {
      this.renderer.addClass(container,'text-truncate')
    }else {
      this.renderer.removeClass(container,'text-truncate')
      
    }
  }
}