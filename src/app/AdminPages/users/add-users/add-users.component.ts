import { UserAPI } from './../../../shared/model/user-api';
import { UserAPIService } from './../../../shared/Service/user-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent implements OnInit {
  //virable we use in this component
  massege = '';
  AddUser: FormGroup;
  img;

  //service to conection with data
  constructor(private userService: UserAPIService) {}

  ngOnInit(): void {
    //start form group
    this.AddUser = new FormGroup({
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
  }
  //method to add user
  AddUsers() {
    //check if valedte
    if (this.AddUser.valid) {
      if (this.AddUser.value['isAdmin'] == '') {
        this.AddUser.value['isAdmin'] = false;
      }
      if (this.AddUser.value['gender'] == '1') {
        this.AddUser.value['gender'] = true;
      } else {
        this.AddUser.value['gender'] = false;
      }
      //start form data
      const fd = new FormData();
      fd.append('userName', this.AddUser.value['userName']);
      fd.append('email', this.AddUser.value['email']);
      fd.append('password', this.AddUser.value['password']);
      fd.append('gender', this.AddUser.value['gender']);
      fd.append('isAdmin', this.AddUser.value['isAdmin']);
      fd.append('userImage', this.img);
      //sent this form data to service to add
      this.userService.ADDUSER(fd).subscribe(
        (Data) => {
          this.massege = 'User Add Sccessfull';
        },
        (ex) => {
          console.log(ex);
          this.massege = 'sory User Add faild';

        }
      );
    }
  }

  // method to uplode file
  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.AddUser.value['userImage'] = null;
    }
  }
}
