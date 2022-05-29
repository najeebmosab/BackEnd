import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GalleriaModule} from 'primeng/galleria';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CartComponent, CheckOutComponent, BuyNowComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CartModule { }
