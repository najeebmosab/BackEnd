import { UserAPIService } from 'src/app/shared/Service/user-api.service';
import { UserAPI } from 'src/app/shared/model/user-api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  user:UserAPI;
  id;
  constructor(
    private userService:UserAPIService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetUserById(this.id).subscribe(
      Data=>{this.user = Data},
      ex=>{console.log(ex);}
    );
  }

}
