import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { Component, DoCheck, OnInit } from '@angular/core';
declare var custom: any;

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css'],
})
export class LoginCustomerComponent implements OnInit, DoCheck {
  constructor() {}
  emailIsNotCorecct = false;
  massege = '';
  ngOnInit(): void {

  }

  rgister = 'login';

  // this function worke when we have a change in code
  ngDoCheck() {

    if (sessionStorage.getItem('NotFound') != null) {
      this.emailIsNotCorecct = true;
      this.massege = sessionStorage.getItem('NotFound');
      console.log("massege",this.massege);
    }
    else{
      this.emailIsNotCorecct = false;
    }
  }

  change(text) {
    debugger;
    this.rgister = text;
    sessionStorage.clear();
    this.ChangeActive();
  }

  // Add and remove class for rigster
  ChangeActive() {
    debugger;
    const div1: HTMLElement = document.getElementById('MyActiveDiv1');
    const div2: HTMLElement = document.getElementById('MyActiveDiv2');

    if (div1.className.includes('active')) {
      div1.classList.remove('active');
      div2.classList.add('active');
    } else if (div2.className.includes('active')) {
      div2.classList.remove('active');
      div1.classList.add('active');
    }
  }
}
