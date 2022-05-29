import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from "ngx-pagination";
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page/search-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class SearchPageModule { }
