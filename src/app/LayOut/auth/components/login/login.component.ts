import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // virable for form
  LoginForm: FormGroup;
  Token: string = '';
  //all whate we need to macke conection with data base
  constructor(
    private service: UserAPIService,
    private _Location: Location,
    private auth: AuthGuard
  ) {}
  //start a validation for form input
  ngOnInit(): void {
    sessionStorage.clear();
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  //function login that macke coniction with data base to check if user is founde
  login() {
    try {
      let obj = {
        email: this.LoginForm.value['email'],
        password: this.LoginForm.value['password'],
      };

      this.service.GetTokenUser(obj).subscribe(
        (Data: string) => {
          debugger;
          this.Token = Data;
          sessionStorage.setItem('Token', this.Token);
          if (this.Token) {
            this.service.getSingelUsers().subscribe(
              (Data) => {
                this.service.user = Data;
                sessionStorage.setItem("UserId",this.service.user.id.toString());
                this._Location.back();
              },
              (ex) => {
                console.log(ex);
              }
            );
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          sessionStorage.setItem(
            'NotFound',
            'Sorry,email or password not correct the user Not Found'
          );
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}
