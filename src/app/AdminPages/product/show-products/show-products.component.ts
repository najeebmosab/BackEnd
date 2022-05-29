import { ProductsAPI } from 'src/app/shared/model/products-api';
import { ProductAPIService } from './../../../shared/Service/product-api.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  massege='';
  Products:ProductsAPI[] = [];
  totalRecords = 0;
  page:number=1;

  constructor(private productService: ProductAPIService) { }

  ngOnInit(): void {
    this.productService.GETProducts().subscribe(
      (Data:Array<ProductsAPI>)=>{this.Products = Data;this.totalRecords = Data.length},
      ex=>{}
    );
  }

  DeleteProduct(id){
    this.productService.DeleteProduct(id).subscribe(
      Data=>{
        console.log(Data);
        this.ngOnInit();
      },
      ex=>{console.log(ex);}
    );
  }

}
