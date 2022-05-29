import { EditOrderComponent } from './edit-order/edit-order.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsDetailsComponent } from './products-details/products-details.component';


const routes: Routes = [
  {path:'ProductsDetails/:id',component:ProductsDetailsComponent},
  {path:'CategoryDetails/:id',component:CategoryDetailsComponent},
  {path:'Edit/:id',component:EditOrderComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
