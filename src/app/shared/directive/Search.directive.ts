import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSearch]',
})
export class AppSearch {
  private el: ElementRef;
  private isOpen = false;
  constructor(el: ElementRef) {
    this.el = el;
  }

  @HostListener('click') onClick() {
    this.isOpen = ! this.isOpen ;
    this.ToOpen();
  }



  private ToOpen() {
    let form:HTMLElement = document.getElementById("myForm");
    if(this.isOpen){
      form.style.transition="2s";

      form.style.opacity="1";

    }
    else{
      form.style.transition="2s";
      form.style.opacity="0";
    }
  }
}
