import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './../../pages/profile/profile/profile.component';
import { HomePageModule } from './../../pages/home-page/home-page.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingLayOutComponent } from './landing-lay-out/landing-lay-out.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LandingLayOutComponent,
    children: [
      {
        path: 'home',
         loadChildren: () => import('src/app/pages/home-page/home-page.module').then(HP=>HP.HomePageModule)
      },
      {
        path: 'View',
        loadChildren: () => import('../../pages/view/view.module').then(V => V.ViewModule)
      },

      {
        path: 'Cart',
        loadChildren: () => import('../../pages/cart/cart.module').then(C => C.CartModule)
      },
      {
        path: 'Search',
        loadChildren: () => import('../../pages/search-page/search-page.module').then(S => S.SearchPageModule)
      },
      {path:'**',loadChildren: () => import('./../../LayOut/error/error.module').then(ER => ER.ErrorModule)},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
