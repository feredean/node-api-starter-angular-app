import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[nasaUnderline]'
})
export class UnderlineDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('underline');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('none');
  }

  private highlight(decoration: string) {
    this.el.nativeElement.style.textDecoration = decoration;
  }
}
