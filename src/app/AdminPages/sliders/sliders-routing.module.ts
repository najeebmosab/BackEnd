import { ShowSlidersComponent } from './show-sliders/show-sliders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {path:"",canActivate:[AuthGuard],component:ShowSlidersComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlidersRoutingModule { }
