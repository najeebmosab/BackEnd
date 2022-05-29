import { EditOrderComponent } from './edit-order/edit-order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {GalleriaModule} from 'primeng/galleria';
import {NgxPaginationModule} from "ngx-pagination";
import{SharedModule}from'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsDetailsComponent, CategoryDetailsComponent,EditOrderComponent ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    DynamicDialogModule,
    GalleriaModule,
    NgxPaginationModule,
    SharedModule,
  ],
  providers: [ConfirmationService],

})
export class ViewModule { }
