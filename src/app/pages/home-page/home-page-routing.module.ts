import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutpageComponent } from './layoutpage/layoutpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutpageComponent,
    children: []
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
