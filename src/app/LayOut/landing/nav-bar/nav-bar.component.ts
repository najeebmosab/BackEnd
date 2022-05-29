import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, DoCheck } from '@angular/core';
// import * as $ from 'jquery';
import { UserAPI } from 'src/app/shared/model/user-api';
import { stringify } from 'querystring';
import { CartService } from 'src/app/shared/Service/cart-service.service';
import { CartAPI } from 'src/app/shared/model/cart-api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  //virable for save data user
  visibleSidebar1;
  Search: FormGroup;
  isLogin = sessionStorage.getItem('Token');
  User: UserAPI;
  MinueList = false;
  isAdmin = sessionStorage.getItem('isAdmin');
  //all whate we need to macke conection with data base
  constructor(
    private _UserService: UserAPIService,
    private cartService: CartService,
    private router: Router,
    private _Location: Location,

  ) {}

  //when the start web page start get user
  ngOnInit() {
    if (this.isLogin) {
      this._UserService.getSingelUsers().subscribe(
        (Data) => {
          this.User = Data;
          sessionStorage.setItem('UserId', this.User.id.toString());
          sessionStorage.setItem('isAdmin', String(this.User.isAdmin));
          this.isAdmin = sessionStorage.getItem('isAdmin');
          console.log(this.User);
        },
        (ex) => {
          console.log(ex);
        }
      );

      this.cartService.GetCart(sessionStorage.getItem('UserId')).subscribe(
        (Data: CartAPI) => {
          console.log(Data);
          sessionStorage.setItem('CartId', Data.id.toString());
        },
        (ex) => {
          console.log(ex);
        }
      );
    }
    this.Search = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }

  Searching() {
    if (this.Search.valid) {
      sessionStorage.setItem('SearchName', this.Search.value['search']);
      this.router.navigate(['/landing/Search']);
    } else {
      console.log("sory don't have value");
    }
  }

  Logout() {
    sessionStorage.removeItem('Token');
    sessionStorage.clear();
    this.router.navigate(['/']).then(
      Data=>{
        window.location.reload();
      }
    );


  }
}
