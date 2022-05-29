import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from "ngx-pagination";
import { OrdersRoutingModule } from './orders-routing.module';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import{SharedModule}from'src/app/shared/shared.module';



@NgModule({
  declarations: [ShowOrdersComponent, EditOrdersComponent, AddOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OrdersModule { }
