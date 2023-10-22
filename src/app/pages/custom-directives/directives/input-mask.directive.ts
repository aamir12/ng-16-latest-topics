import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputMask]',
  standalone:true
})
export class InputMaskDirective {
  @Input() appInputMask: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value.replace(/\D/g, '');
    let maskedValue = '';

    let valueIndex = 0;
    for (let maskIndex = 0; maskIndex < this.appInputMask.length; maskIndex++) {
      if (/\d/.test(this.appInputMask[maskIndex])) {
        if (originalValue[valueIndex]) {
          maskedValue += originalValue[valueIndex++];
        } else {
          break;
        }
      } else {
        maskedValue += this.appInputMask[maskIndex];
      }
    }

    input.value = maskedValue;
  }
}