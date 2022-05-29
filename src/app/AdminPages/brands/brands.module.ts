import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBrandComponent } from './show-brand/show-brand.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandsRoutingModule } from './brands-routing.module';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ViewBrandComponent } from './view-brand/view-brand.component';
import {NgxPaginationModule} from "ngx-pagination";
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [ShowBrandComponent, UpdateBrandComponent, AddBrandComponent, ViewBrandComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrandsRoutingModule,
    NgxPaginationModule,
    DialogModule,
    ButtonModule
  ]
})
export class BrandsModule { }
