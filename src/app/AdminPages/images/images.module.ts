import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { UpdateImagesComponent } from './update-images/update-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpdateImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ImagesModule { }
