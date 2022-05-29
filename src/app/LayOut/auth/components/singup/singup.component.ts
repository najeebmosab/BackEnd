import { style } from '@angular/animations';
import { CartAPI } from './../../../../shared/model/cart-api';
import { CartService } from './../../../../shared/Service/cart-service.service';
import { Router } from '@angular/router';
import { UserAPI } from './../../../../shared/model/user-api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, DoCheck, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent implements OnInit, DoCheck {
  SingUpForm: FormGroup; //virable for form
  res: UserAPI;
  Token: string;
  img = 'defultImg.png';
  notEqual = false;
  emailFound = false;
  isNotNumber= false;
  // all what we need to coniction with Data base
  constructor(private http: UserAPIService, private _Router: Router) {}
  ngDoCheck(): void {}

  // start validation for a input valid
  ngOnInit(): void {
    this.SingUpForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{2,}'
        ),
      ]),
      gender: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  CheckEmail(event) {
    debugger;
    this.http.CheckEmail(event).subscribe(
      (Data) => {
        console.log(Data);
        if (Data != null) {
          this.emailFound = true;
        } else {
          this.emailFound = false;
        }
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
  // start function for singup and coniction with dtat base
  SingUp() {
    sessionStorage.removeItem('isset');
    try {
      switch (this.SingUpForm.value['gender']) {
        case '1':
          this.SingUpForm.value['gender'] = true;
          break;
        case '0':
          this.SingUpForm.value['gender'] = false;
          break;
      }
      if (this.SingUpForm.valid) {
        debugger;
        let obj: UserAPI = {
          userName: this.SingUpForm.value['userName'],
          email: this.SingUpForm.value['email'],
          password: this.SingUpForm.value['password'],
          isAdmin: false,
          gender: this.SingUpForm.value['gender'],
          userImage: this.img,
          code: '',
          isEmail: false,
        };

        sessionStorage.setItem('NewUser', JSON.stringify(obj));
        this._Router.navigate(['/auth/SingUpCode']);
      }
    } catch {
      console.log('err');
    }
  }

  CheckEqual(par) {
    if (this.SingUpForm.value['password'] != par) {
      this.notEqual = true;
    } else {
      this.notEqual = false;
    }
  }

  CheckUser(par: string) {
    debugger;
    console.log();

    if (/\d/.test(par.substring(0,1))) {
      this.isNotNumber = true;
      document.getElementById("userName").style.borderColor ="red"
    }
    else{
      this.isNotNumber = false;
      document.getElementById("userName").style.borderColor ="green"
    }
  }

  // this.http.ADDUSER(fd).subscribe(
  //   (Data: any) => {
  //     this.res = Data;
  //     if(this.res)
  //   {
  //     debugger;
  //     sessionStorage.setItem('email', this.res.email);
  //     let createCart = {
  //       usersid:this.res.id
  //     }

  //     this.cartService.AddCart(createCart).subscribe(
  //       (Data:CartAPI)=>{console.log(Data);sessionStorage.setItem("CartId",(Data.id).toString());},
  //       ex=>{console.log(ex);},
  //     );

  //     let login = {
  //       email:this.res.email,
  //       password:this.SingUpForm.value['password']
  //     }
  //     this.http.GetTokenUser(login).subscribe(
  //       (Data:string)=>{
  //         this.Token = Data;
  //         sessionStorage.setItem('Token',this.Token);
  //         this._Router.navigate(["/auth/SingUpCode"]);
  //       },
  //       (err:HttpErrorResponse)=>{
  //         console.log(err);}
  //       );
  //   }
  //   },
  //   (err: HttpErrorResponse) => {
  //     console.log(err);
  //     sessionStorage.setItem('NotFound',"Try With Other Email or User Name ");
  //   }
  // );
}
