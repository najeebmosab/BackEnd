import { ProfileModule } from './pages/profile/profile.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthModule } from './layout/auth/auth.module';
import { LandingModule } from './layout/landing/landing.module';
import { AdminLandingModule } from './layout/admin-landing/admin-landing.module';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'landing',pathMatch:"full"},
    {
      path: 'landing',
      loadChildren: () => import('./layout/landing/landing.module').then(L => LandingModule),
    },

    {path:"auth",loadChildren: () => import('./layout/auth/auth.module').then(L => AuthModule)},

    {path:"Admin",canActivate:[AuthGuard],loadChildren: () => import('./layout/admin-landing/admin-landing.module').then(AM => AdminLandingModule)},

    {path:"profile",loadChildren: () => import('./pages/profile/profile.module').then(PF=>PF.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
