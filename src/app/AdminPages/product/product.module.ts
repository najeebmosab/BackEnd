import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ShowProductsComponent } from './show-products/show-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewProductsComponent } from './view-products/view-products.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import {GalleriaModule} from 'primeng/galleria';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [ShowProductsComponent, AddProductsComponent, ViewProductsComponent, UpdateProductsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GalleriaModule,
    NgxPaginationModule
  ]
})
export class ProductModule { }
