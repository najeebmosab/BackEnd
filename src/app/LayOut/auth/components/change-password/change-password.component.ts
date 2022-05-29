import { UserAPI } from './../../../../shared/model/user-api';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  massege ="";
  UserForm:FormGroup;
  notEqual=false;
  constructor(private userService:UserAPIService,private _Location: Location,) { }

  ngOnInit(): void {
    this.UserForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  CheckEqual(par) {
    if (this.UserForm.value['password'] != par) {
      this.notEqual = true;
    } else {
      this.notEqual = false;
    }
  }
  ChangeEmail(){
    if(this.UserForm.valid)
    {
      this.userService.GetUserById(sessionStorage.getItem("idUser")).subscribe(
        (Data:UserAPI)=>{
         const fd = new FormData();
         fd.append("userName",Data.userName);
         fd.append("email",Data.email);
         fd.append("password",this.UserForm.value["password"]);
         fd.append("gender",JSON.stringify(Data.gender));
         fd.append("isAdmin",JSON.stringify(Data.isAdmin));
         fd.append("userImage",Data.userImage);

          this.userService.UpdateUser(sessionStorage.getItem("idUser"),fd).subscribe(
            Data=>
            {
              console.log(Data);
              this._Location.go("/");
              window.location.reload();
            },
            ex=>{console.log(ex);}
          );
        },
        (ex)=>{console.log(ex);}
      );

    }
  }
}
