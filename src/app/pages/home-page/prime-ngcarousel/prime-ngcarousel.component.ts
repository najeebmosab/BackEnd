import { ProductAPIService } from 'src/app/shared/Service/product-api.service';
import { ProductsAPI } from './../../../shared/model/products-api';
import { Component, OnInit } from '@angular/core';
import { CartProductService } from 'src/app/shared/Service/cart-product-service.service';

@Component({
  selector: 'app-prime-ngcarousel',
  templateUrl: './prime-ngcarousel.component.html',
  styleUrls: ['./prime-ngcarousel.component.css']
})
export class PrimeNGCarouselComponent implements OnInit {
Products:ProductsAPI;
responsiveOptions;
  constructor(private productService:ProductAPIService,private cartProductService:CartProductService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.productService.GetProductsSaleProduct().subscribe(
      Data=>{this.Products = Data},
      ex=>{console.log(ex);}
    );
  }

  AddCart(par){
    let obj={
      productId:par,
      cartId:Number(sessionStorage.getItem("CartId")),
      quantity:1,
    }
    this.cartProductService.AddCart(obj).subscribe(
      Data=>{console.log(Data);},
      ex=>{console.log(ex);}
    );
  }
}
