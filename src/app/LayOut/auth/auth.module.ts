import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayOutComponent } from './components/auth-lay-out/auth-lay-out.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { CodeSingUpComponent } from './components/code-sing-up/code-sing-up.component';
import { CheckEmailComponent } from './components/check-email/check-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [AuthLayOutComponent, LoginCustomerComponent, LoginComponent, SingupComponent, CodeSingUpComponent, CheckEmailComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers:[HttpClientModule]
})
export class AuthModule { }
