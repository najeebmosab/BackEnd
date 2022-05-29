import { stringify } from 'querystring';
import { UserAPI } from './../../../../shared/model/user-api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css'],
})
export class CheckEmailComponent implements OnInit {
  massege = '';
  EmailForm: FormGroup;

  constructor(private http: UserAPIService, private _Location: Location,) {}

  ngOnInit(): void {
    this.EmailForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
      ]),
    });
  }
  CheckEmail() {
    debugger;
    this.http.CheckEmail(this.EmailForm.value['Email']).subscribe(
      (Data:UserAPI) => {
        console.log(Data);
        if (Data != null) {
          sessionStorage.setItem("idUser",JSON.stringify(Data?.id));
          this._Location.go("/auth/ChangePassword")
          window.location.reload();
        } else {
          this.massege = 'Sory The Email Is Not Found';
        }
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}
