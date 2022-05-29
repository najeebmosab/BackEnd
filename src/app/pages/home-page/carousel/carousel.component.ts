import { SlidersAPI } from './../../../shared/model/sliders';
import { SlidersServic } from './../../../shared/Service/sliders-servic.service';

import { ProductsAPI } from './../../../shared/model/products-api';
import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {
  sliders:SlidersAPI;

  constructor(private sliderService:SlidersServic,) {

  }

  ngOnInit(): void {
    this.sliderService.GetSliders().subscribe(
       Data=>{ this.sliders = Data ;console.log('sliders',this.sliders);},
       ex=>{console.log(ex);}
    );
  }


}
