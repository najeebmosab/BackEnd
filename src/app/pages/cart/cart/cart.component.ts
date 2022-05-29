import { CartProductAPI } from './../../../shared/model/cart-product-api';
import { CartProductService } from './../../../shared/Service/cart-product-service.service';
import { stringify } from 'querystring';
import { UserAPI } from './../../../shared/model/user-api';
import { CartService } from './../../../shared/Service/cart-service.service';
import { Component, OnInit } from '@angular/core';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { CartAPI } from 'src/app/shared/model/cart-api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: ProductsAPI[] = [];
  cart: CartAPI;
  TotalPrice = 0;
  SubPrice = 0;
  FinalPrice = 0;
  DataCartProduct;
  massage = '';
  counCart=0;
  constructor(
    private cartService: CartService,
    private cartProduct: CartProductService
  ) {}

  ngOnInit(): void {
    this.TotalPrice = 0;
    this.SubPrice = 0;
    this.FinalPrice = 0;
    this.cartService.GetCart(sessionStorage.getItem('UserId')).subscribe(
      (Data: CartAPI) => {
        console.log(Data);
        sessionStorage.setItem('CartId', Data.id.toString());
        this.cartProduct.GetCart(sessionStorage.getItem('CartId')).subscribe(
          (Data: Array<CartProductAPI>) => {
            this.DataCartProduct = Data;
            this.counCart = Data?.length;
            console.log('cartproduct', this.DataCartProduct);
            debugger;
            for (let i = 0; i < Data?.length; i++) {
              this.products[i] = Data[i]?.products;
              this.TotalPrice += this.products[i].price * Data[i]?.quantity;
              if (this.products[i].salePrice > 0) {
                this.SubPrice +=
                  this.products[i].price * Data[i]?.quantity -
                  this.products[i].salePrice * Data[i]?.quantity;
              }
            }
            this.FinalPrice = this.TotalPrice - this.SubPrice;
          },
          (ex) => {
            console.log(ex);
          }
        );
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  DeleteProductFromCart(id) {

    this.cartProduct.DeleteCart(id).subscribe(
      (Data) => {
        console.log(Data);
        this.massage = "Delete Product Is Successfull";
        window.location.reload();
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  Quantity(par, cartProductId) {
    this.cartProduct.GetCartProduct(cartProductId).subscribe(
      (Data: CartProductAPI) => {
        switch (par) {
          case '+':
            Data.quantity++;
            break;
          case '-':
            Data.quantity--;
            break;
        }
        if (Data.quantity <= 0) {
          this.DeleteProductFromCart(cartProductId);
        }

        let obj: CartProductAPI = {
          id: cartProductId,
          productId: Data.productId,
          cartId: Data.cartId,
          quantity: Data.quantity,
          products: Data?.products,
        };
        this.cartProduct.UpdateCart(cartProductId, obj).subscribe(
          (Data) => {
            this.massage = 'Update Is Sccessfull';
            this.ngOnInit();
          },
          (ex) => {
            console.log(ex);
          }
        );
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}
