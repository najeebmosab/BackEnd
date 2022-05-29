import { HttpErrorResponse } from '@angular/common/http';
import { UserAPI } from 'src/app/shared/model/user-api';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/shared/Service/order-details.service';
import { CartService } from 'src/app/shared/Service/cart-service.service';
import { CartAPI } from 'src/app/shared/model/cart-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-sing-up',
  templateUrl: './code-sing-up.component.html',
  styleUrls: ['./code-sing-up.component.css'],
})
export class CodeSingUpComponent implements OnInit {
  CodeForm: FormGroup;
  obj: UserAPI;
  CheckNumber;
  massege:string = "";
  constructor(
    private orderDetailsService: OrderDetailsService,
    private userService: UserAPIService,
    private cartService: CartService,
    private _Router: Router
  ) {}
  isCorrect = false;

  ngOnInit(): void {
    if (Number(sessionStorage.getItem('CheckNumber')) > 0) {
      this.CheckNumber = Number(sessionStorage.getItem('CheckNumber'));
    } else {
      this.CheckNumber = 0;
    }
    this.obj = JSON.parse(sessionStorage.getItem('NewUser'));
    debugger;
    const fd = new FormData();

    fd.append('To', this.obj.email);
    this.orderDetailsService.SendEmailCheckCode(fd).subscribe(
      (Data: any) => {
        this.obj.code = Data;
      },
      (ex: HttpErrorResponse) => {
        this.obj.code = ex.error?.text;

        console.log('obj', this.obj);
      }
    );
    this.CodeForm = new FormGroup({
      Code: new FormControl('', [Validators.required,Validators.maxLength(4)]),
    });
  }

  Check() {
    debugger;
    if (this.CodeForm.valid) {
      if (this.CodeForm.value['Code'] == this.obj.code) {
        this.obj.isEmail = true;
        let fd = new FormData();
        fd.append('userName', this.obj.userName);
        fd.append('email', this.obj.email);
        fd.append('password', this.obj.password);
        fd.append('gender', String(this.obj.gender));
        fd.append('isAdmin', String(this.obj.isAdmin));
        fd.append('isEmail', String(this.obj.isEmail));
        fd.append('code', this.obj.code);
        fd.append('userImage', this.obj.userImage);

        this.userService.ADDUSER(fd).subscribe(
          (Data: UserAPI) => {
            let res: UserAPI = Data;
            if (res) {
              debugger;
              let createCart = {
                usersid: res.id,
              };
              this.cartService.AddCart(createCart).subscribe(
                (Data: CartAPI) => {
                  console.log(Data);
                  sessionStorage.setItem('CartId', Data.id.toString());
                },
                (ex) => {
                  console.log(ex);
                }
              );

              let login = {
                email: res.email,
                password: this.obj.password,
              };

              this.userService.GetTokenUser(login).subscribe(
                (Data: string) => {
                  sessionStorage.setItem('Token', Data);
                  this._Router.navigate(['/']);
                },
                (err: HttpErrorResponse) => {
                  console.log(err);
                }
              );
            }
          },
          (ex) => {
            console.log(ex);
          }
        );
      } else {
        if (this.CheckNumber < 3) {
          this.CheckNumber++;
          sessionStorage.setItem('CheckNumber',this.CheckNumber);
          this.massege = "The Code Not Correct Please Try Agin";
          this.ngOnInit();
        }
        else{
          sessionStorage.setItem('NotFound',"This Email Is Not Real,Please Try With Other Email ");
          window.location.replace("/auth");
        }
      }
    }
  }
}
