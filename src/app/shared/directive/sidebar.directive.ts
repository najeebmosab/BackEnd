import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSidebar]',
})
export class SidebarDirective {
  constructor() {}
  private flage = false;
  @HostListener('click') onclick() {
    debugger;
    let sidebar = document.querySelector('.sidebar');


      if(!sidebar.className.includes('open'))
      {
        sidebar.classList.add('open');
        this.flage = !this.flage;
      }
      else{
        sidebar.classList.remove('open');
        this.flage = !this.flage;
      }

    this.menuBtnChange(); //calling the function(optional)



  }

  private menuBtnChange() {
    let closeBtn = document.querySelector('#btn');

    if (this.flage) {
      closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
    } else {
      closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
    }
  }
}
