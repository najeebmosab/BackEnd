import { OrderDetails } from './../../../shared/model/order-details';
import { OrderDetailsService } from './../../../shared/Service/order-details.service';
import { OrderService } from './../../../shared/Service/order.service';
import { Order } from './../../../shared/model/order';
import { UserAPIService } from './../../../shared/Service/user-api.service';
import { UserAPI } from './../../../shared/model/user-api';
import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { ProductsAPI } from './../../../shared/model/products-api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css'],
})
export class AddOrdersComponent implements OnInit {
  massege = '';
  AddOrder: FormGroup;
  products: ProductsAPI[];
  users: UserAPI[];
  ngSelectQuantity = 1;
  ngSelectSize = 'M';
  ngUserId;
  ngProductId;
  constructor(
    private productService: ProductAPIService,
    private userService: UserAPIService,
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService,
  ) {}

  ngOnInit(): void {
    this.AddOrder = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      brandId: new FormControl('', [Validators.required]),
      productImage: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      isOrder: new FormControl('', [Validators.required]),
    });

    this.userService.GET_ALL_USERS_FOR_ADMIN().subscribe(
      (Data: Array<UserAPI>) => {
        console.log(Data);
        this.users = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.productService.GETProducts().subscribe(
      (Data: Array<ProductsAPI>) => {
        this.products = Data;
        console.log(this.products);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  AddOrders() {
    this.ProductInformation();
    debugger;
    if (this.AddOrder.value) {
      let obj: Order = {
        userId: this.ngUserId,
        email: this.AddOrder.value['email'],
        name: this.AddOrder.value['name'],
        address: this.AddOrder.value['address'],
        city: this.AddOrder.value['city'],
        postalCode: this.AddOrder.value['postalCode'],
        phone: this.AddOrder.value['phone'],
        total: this.AddOrder.value['total'],
      };
      this.orderService.AddOrder(obj).subscribe(
        (Data: Order) => {
          console.log(Data);
          let newObj:OrderDetails = {
            orderId:Data.id,
            categoryId:this.AddOrder.value['categoryId'],
            brandId:this.AddOrder.value['brandId'],
            productImage:this.AddOrder.value['productImage'],
            productName:this.AddOrder.value['productName'],
            productPrice:this.AddOrder.value['productPrice'],
            productDescription:this.AddOrder.value['productDescription'],
            quantity:this.AddOrder.value['quantity'],
            size:this.AddOrder.value['size'],
            isOrder:this.AddOrder.value['isOrder'],
          }
          this.orderDetailsService.AddOrderDetails(newObj).subscribe(
            Data=>{this.massege= "Add Order Is Successfull";console.log(Data);},
            ex=>{console.log(ex);}
          );
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      console.log(false);
    }
  }

  GetUser() {
    return this.users.find((U) => U.id === Number(this.ngUserId));
  }

  GetProduct() {
    return this.products.find((P) => P.id === Number(this.ngProductId));
  }

  ProductInformation() {
    let U1: UserAPI = this.GetUser();
    this.AddOrder.value['email'] = U1.email;
    this.AddOrder.value['name'] = U1.userName;
    let product: ProductsAPI = this.GetProduct();
    this.AddOrder.value['categoryId'] = product.categoryId;
    this.AddOrder.value['brandId'] = product.brandId;
    this.AddOrder.value['productImage'] = product.imageProduct;
    this.AddOrder.value['productName'] = product.productName;
    let price = 0;
    if (product.salePrice > 0) {
      price = product.salePrice;
    } else {
      price = product.price;
    }
    this.AddOrder.value['productPrice'] = price;
    this.AddOrder.value['total'] = price * this.ngSelectQuantity;
    this.AddOrder.value['productDescription'] = product.shortDescription;
    this.AddOrder.value['isOrder'] = false;
  }
}
