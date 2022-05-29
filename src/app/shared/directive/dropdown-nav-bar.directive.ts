import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownNavBar]',
})
export class DropdownNavBarDirective {
  private el: ElementRef;
  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener('mouseenter') onMouseEnter() {

    this.highlight("block");
  }

  @HostListener('mouseleave') onMouseLeave() {

    this.highlight('none');
  }

  private highlight(par:string) {
    let ul: HTMLElement = document.getElementById('ul_drop');
    ul.style.display=par;
  }
}
