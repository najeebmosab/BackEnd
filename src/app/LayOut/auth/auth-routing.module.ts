import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CheckEmailComponent } from './components/check-email/check-email.component';
import { LoginCustomerComponent } from './components/login-customer/login-customer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayOutComponent } from './components/auth-lay-out/auth-lay-out.component';
import { CodeSingUpComponent } from './components/code-sing-up/code-sing-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginCustomerComponent,
  },
  {
    path: 'SingUpCode',
    component: CodeSingUpComponent,
  },
  {
    path: 'CheckEmail',
    component: CheckEmailComponent,
  },
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
