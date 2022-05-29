import { style } from '@angular/animations';
import { Directive, DoCheck, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[ScrollNavBar]',
})
export class ScrollNavBar {
  constructor(private _el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let myNavbar = document.querySelectorAll('#myNavbar a');
    let i:HTMLElement = document.querySelector(".fa-sort-down");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    )
    {
      // this._el.nativeElement.classList.add('fixed-top');
      this._el.nativeElement.classList.add('bg-white');

      for (let index = 0; index < myNavbar.length; index++) {
        myNavbar[index].classList.remove('color-text');
        myNavbar[index].classList.add('color-text-black');
      }

      i.classList.remove("color-text");
      i.classList.add("color-text-black");

    }

    else {

      this._el.nativeElement.classList.remove('bg-white');

      for (let index = 0; index < myNavbar.length; index++) {
        myNavbar[index].classList.remove('color-text-black');
        myNavbar[index].classList.add('color-text');
      }

      i.classList.remove("color-text-black");
      i.classList.add("color-text");

    }

  }
}
