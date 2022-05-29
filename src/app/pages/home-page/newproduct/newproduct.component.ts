import { CartProductService } from './../../../shared/Service/cart-product-service.service';
import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { Component, OnInit } from '@angular/core';
import { CartProductAPI } from 'src/app/shared/model/cart-product-api';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css'],
})
export class NewproductComponent implements OnInit {
  Products: ProductsAPI;

  constructor(
    private productService: ProductAPIService,
    private cartProductService: CartProductService
  ) {}

  ngOnInit(): void {
    this.productService.GetNewProduct().subscribe(
      (Data) => {
        this.Products = Data;
        console.log('new', Data);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  AddCart(par) {
    if (sessionStorage.getItem('Token')) {
      let obj = {
        productId: par,
        cartId: Number(sessionStorage.getItem('CartId')),
        quantity: 1,
      };
      this.cartProductService.AddCart(obj).subscribe(
        (Data) => {
          console.log(Data);
        },
        (ex) => {
          console.log(ex);
        }
      );
    }else{
      alert("You Must Login");
    }
  }
}
