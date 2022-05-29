import { UserAPI } from './../../../shared/model/user-api';
import { UserAPIService } from './../../../shared/Service/user-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartAPI } from 'src/app/shared/model/cart-api';
import { CartProductAPI } from 'src/app/shared/model/cart-product-api';
import { Order } from 'src/app/shared/model/order';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { CartProductService } from 'src/app/shared/Service/cart-product-service.service';
import { CartService } from 'src/app/shared/Service/cart-service.service';
import { OrderDetailsService } from 'src/app/shared/Service/order-details.service';
import { OrderService } from 'src/app/shared/Service/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  products: ProductsAPI[] = [];
  cart: CartAPI;
  TotalPrice = 0;
  SubPrice = 0;
  FinalPrice = 0;
  DataCartProduct;
  massage = '';
  quantity = 1;
  size;
  formOrder: FormGroup;
  user:UserAPI;
  constructor(
    private cartService: CartService,
    private cartProduct: CartProductService,
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService,
    private userService: UserAPIService,
  ) {}

  ngOnInit(): void {

    this.formOrder = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    });

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
    this.userService.getSingelUsers().subscribe(
      Data=>{this.user = Data},
      ex=>{console.log(ex);}
    );
  }

  BuyNow() {
    debugger;
    if (this.formOrder.valid) {

      let order = {
        userId: sessionStorage.getItem('UserId'),
        name: this.formOrder.value['name'],
        email: this.user.email,
        address: this.formOrder.value['address'],
        city: this.formOrder.value['city'],
        postalCode: this.formOrder.value['postalCode'],
        phone: this.formOrder.value['phone'],
        total: this.FinalPrice,
      };

      this.orderService.AddOrder(order).subscribe(
        (Data: Order) => {
          console.log(Data);
          sessionStorage.setItem('orderId', Data.id.toString());
          this.AddOrderDetails();
        },
        (ex) => {
          console.log(ex);
        }
      );
    }
  }

  AddOrderDetails() {
    debugger;
    for (let i = 0; i < this.products.length; i++) {
      let price = 0;
    if (this.products[i].salePrice > 0) {
      price = this.products[i].salePrice;
    } else {
      price = this.products[i].price;
    }
    let OrderDetails = {
      orderId: sessionStorage.getItem('orderId'),
      categoryId: this.products[i].categoryId,
      brandId: this.products[i].brandId,
      productImage: this.products[i].imageProduct,
      productName: this.products[i].productName,
      productPrice: price,
      productDescription: this.products[i].description,
      quantity:this.quantity,
      size:this.size,
      isOrder: false,
    };
    this.orderDetailsService.AddOrderDetails(OrderDetails).subscribe(
      Data=>{console.log(Data);this.massage="Add Order Is Successfull"},
      ex=>{console.log(ex);}
    );
    }


  }

}
