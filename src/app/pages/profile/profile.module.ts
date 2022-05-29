import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, MyProfileComponent, MyOrderComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule { }
