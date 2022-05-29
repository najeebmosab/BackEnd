// import { style } from '@angular/animations';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpenCloseSideBar]'
})
export class OpenCloseSideBarDirective {

  private el: ElementRef;
  private flage :boolean = true;
  constructor(el: ElementRef) {
    debugger;
    this.el = el;
  }

  // @HostListener('mouseenter') onMouseEnter() {
  //   debugger;
  //   this.highlight('yellow');
  // }
 private arr = ['User','Customer','Comment','Products','Category','Order'];
 private icons = ['<i class="fas fa-user"></i>','<i class="fas fa-users"></i>','<i class="fas fa-envelope"></i>','<img src="../../../../assets/img/cubes.png" w-25 height="15px" alt="">','<i class="fab fa-buffer"></i>','<i class="fas fa-shopping-bag"></i>'];
  @HostListener('click') onclick() {
    this.flage = !this.flage;
    this.highlight();
  }



  private highlight() {
    if(this.flage)
    {
      // console.log(document.getElementById('sideBar'));
      let div:HTMLElement = document.getElementById('sideBar');
      div.style.transition='2s';
      div.style.width='250px';
      for(let i = 0 ; i < 7;i++ )
      {
        let tag_a:any = document.getElementsByClassName('toDel').item(i);
        div.style.transition='2s';
        tag_a.style.opacity='1';
        console.log(tag_a);
      }

    }
    else{
      let div:HTMLElement = document.getElementById('sideBar');
      div.style.transition='2s';
      div.style.width='4.6rem';

      for(let i = 0 ; i < 7;i++ )
      {
        let tag_a:any = document.getElementsByClassName('toDel').item(i);
        div.style.transition='2s';
        tag_a.style.opacity='0';
        console.log(tag_a);
      }

    }

  }

}
