import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ShowCategoryComponent } from './show-category/show-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [ShowCategoryComponent, AddCategoryComponent, UpdateCategoryComponent, ViewCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    NgxPaginationModule
  ]
})
export class CategoriesModule { }
