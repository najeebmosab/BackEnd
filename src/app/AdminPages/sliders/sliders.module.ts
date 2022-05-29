import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidersRoutingModule } from './sliders-routing.module';
import { ShowSlidersComponent } from './show-sliders/show-sliders.component';
import { AddSlidersComponent } from './add-sliders/add-sliders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateSlidersComponent } from './update-sliders/update-sliders.component';
import { ViewSliderComponent } from './view-slider/view-slider.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [ShowSlidersComponent, AddSlidersComponent, UpdateSlidersComponent, ViewSliderComponent],
  imports: [
    CommonModule,
    SlidersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SlidersModule { }
