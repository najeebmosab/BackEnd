import { ImageAPI } from './../../../shared/model/image-api';
import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { ProductsAPI } from './../../../shared/model/products-api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  id;
  product:ProductsAPI;
  images:ImageAPI;
  constructor(
    private productService:ProductAPIService,
    private activatedRoute: ActivatedRoute
  ) { }
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.GETProduct(this.id).subscribe(
      (Data:ProductsAPI)=>{this.product = Data;this.images = this.product.image;console.log(this.images);},
      ex=>{console.log(ex);}
    );
  }



}
