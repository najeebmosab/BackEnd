import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ShowUsersComponent } from './show-users/show-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUsersComponent } from './add-users/add-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [ShowUsersComponent, AddUsersComponent, UpdateUsersComponent, ViewUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UsersModule { }
