import { UserAPI } from './../../../shared/model/user-api';
import { UserAPIService } from './../../../shared/Service/user-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  //virable use in this
  users:UserAPI[] = [];
  massege="";
  totalRecords = 0;
  page:number=1;
  constructor(
    private userService:UserAPIService
  ) { }

  ngOnInit(): void {
    debugger;
    this.userService.GET_ALL_USERS_FOR_ADMIN().subscribe(
      (Data:Array<UserAPI>)=>{this.users = Data;this.totalRecords = Data.length},
      ex=>{console.log(ex);}
    );
  }

  DeleteUser(id)
  {
    this.userService.DeleteUser(id).subscribe(
      Data=>{
        this.massege="Delete User Sccessfull";
        window.location.reload();
    },
      ex=>{console.log(ex);}
    );
  }

}
