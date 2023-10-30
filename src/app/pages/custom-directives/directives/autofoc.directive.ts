import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[appAutoFocus]',
    standalone:true
})
export class AutoFocDirective implements OnChanges {
  
    @Input() appAutoFocus = false;
    @Input() focusDelay = 0;
  
    public constructor(private host: ElementRef) {
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (!!this.appAutoFocus) {
        if (this.focusDelay === 0) {
          this.host.nativeElement.focus();
        } else {
          setTimeout(() => {
            this.host.nativeElement.focus();
          }, this.focusDelay);
        }
      }
    }
}