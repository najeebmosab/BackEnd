import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/layout/auth/auth.module';

const routes: Routes = [
  {path:'',component:ProfileComponent},
  {path:"auth",loadChildren: () => import('src/app/layout/auth/auth.module').then(L => AuthModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
