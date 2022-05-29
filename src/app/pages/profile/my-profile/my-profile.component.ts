import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAPI } from 'src/app/shared/model/user-api';
import { UserAPIService } from 'src/app/shared/Service/user-api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  massege = '';
  UpdateUser: FormGroup;
  img;
  id;
  user: UserAPI;
  constructor(
    private userService: UserAPIService,
  ) {}

  ngOnInit(): void {
    //start form Group
    this.UpdateUser = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      gender: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', []),
      userImage: new FormControl('', []),
    });


    this.id = sessionStorage.getItem("UserId");

    this.userService.GetUserById(this.id).subscribe(
      (Data) => {
        this.user = Data;
        console.log(this.user);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  UpdateUsers() {
    debugger;
    this.Value();
    if (this.UpdateUser.value) {
      const fd = new FormData();
      fd.append('userName', this.UpdateUser.value['userName']);
      fd.append('email', this.UpdateUser.value['email']);
      fd.append('password', this.UpdateUser.value['password']);
      if (this.UpdateUser.value['gender'] =="0") {
        fd.append('gender', "false");
      }
      else{
        fd.append('gender', "true");
      }
      fd.append('isAdmin', String(this.user.isAdmin));
      if (this.img == null) {
        fd.append('userImage', this.UpdateUser.value['userImage']);
      }
      else{
        fd.append('userImage', this.img);
      }

      this.userService.UpdateUser(this.id,fd).subscribe(
        Data=>{this.massege = "Update User Is Sccessfull";this.ngOnInit();},
        ex=>{this.massege = "Sory User Is Falid"},
      );
    }
  }

  Value() {
    if (this.UpdateUser.value['userName'] == '') {
      this.UpdateUser.value['userName'] = this.user.userName;
    }

    if (this.UpdateUser.value['email'] == '') {
      this.UpdateUser.value['email'] = this.user.email;
    }

    if (this.UpdateUser.value['password'] == '') {
      this.UpdateUser.value['password'] = this.user.password;
    }

    if (this.UpdateUser.value['gender'] == '') {
      this.UpdateUser.value['gender'] = this.user.gender;
    }

    if (this.UpdateUser.value['isAdmin'] == '') {
      this.UpdateUser.value['isAdmin'] = false;
    }
    else{
      this.UpdateUser.value['isAdmin'] = true;
    }
  }

  // method to uplode file
  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.UpdateUser.value['userImage'] = null;
    }
  }

}
