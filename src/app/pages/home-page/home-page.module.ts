import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { LayoutpageComponent } from './layoutpage/layoutpage.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoryComponent } from './category/category.component';
import { PrimeNGCarouselComponent } from './prime-ngcarousel/prime-ngcarousel.component';
import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [LayoutpageComponent, NewproductComponent, CarouselComponent, CategoryComponent, PrimeNGCarouselComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CarouselModule,
    ButtonModule
  ],

})
export class HomePageModule { }
