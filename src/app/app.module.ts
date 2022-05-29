import { ProductModule } from './AdminPages/product/product.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {DataViewModule} from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { SlidersModule } from './AdminPages/sliders/sliders.module';
import {GalleriaModule} from 'primeng/galleria';
import { ImagesModule } from './AdminPages/images/images.module';
import { UsersModule } from './AdminPages/users/users.module';
import { CategoriesModule } from './AdminPages/categories/categories.module';
import { BrandsModule } from './AdminPages/brands/brands.module';
import { SearchPageModule } from './pages/search-page/search-page.module';
import { OrdersModule } from './AdminPages/orders/orders.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    SlidersModule,
    NgbModule,
    AccordionModule,
    DataViewModule,
    ProductModule,
    GalleriaModule,
    ImagesModule,
    UsersModule,
    CategoriesModule,
    BrandsModule,
    SearchPageModule,
    OrdersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BrowserAnimationsModule]
})
export class AppModule { }
