import { CheckOutComponent } from './check-out/check-out.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:CartComponent},
  {path:'BuyNow/:id',component:BuyNowComponent},
  {path:'CheckOut',component:CheckOutComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
