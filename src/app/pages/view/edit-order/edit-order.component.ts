import { OrderService } from './../../../shared/Service/order.service';
import { Order } from './../../../shared/model/order';
import { OrderDetailsService } from 'src/app/shared/Service/order-details.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  updateOrder: FormGroup;
  id;
  massege = '';
  Order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderDetailsService: OrderDetailsService,
    private orderService:OrderService

  ) {}

  ngOnInit(): void {
    this.updateOrder = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])

    });
    //get id from url
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.orderDetailsService.GetByOrderId(this.id).subscribe(
      Data=>{this.Order = Data;console.log(Data);},
      ex=>{console.log(ex);}
    );


  }

  UpdateOrders() {
    this.Values();
    if (this.updateOrder.value) {
      debugger;
      let order={
        email:this.updateOrder.value['email'],
        name: this.updateOrder.value['name'],
        address: this.updateOrder.value['address'],
        city: this.updateOrder.value['city'],
        postalCode: this.updateOrder.value['postalCode'],
        phone: this.updateOrder.value['phone'],
        userId:this.Order?.order?.userId,
        total:this.Order?.productPrice * this.updateOrder.value['quantity'],
      }
      this.orderService.UpdateOrder(this.id,order).subscribe(
        Data=>{
          console.log(Data);
          this.UpdateOrderDetails();
        },
        ex=>{console.log(ex);},
      );
    } else {
      this.massege = 'Error Update Product';
    }
  }


  UpdateOrderDetails(){
    let obj={
      orderId:this.Order?.orderId,
      categoryId:this.Order?.categoryId,
      brandId:this.Order?.brandId,
      productImage:this.Order?.productImage,
      productName:this.Order?.productName,
      productPrice:this.Order?.productPrice,
      productDescription:this.Order?.productDescription,
      isOrder:this.Order?.isOrder,
      quantity:this.updateOrder.value['quantity'],
      size:this.updateOrder.value['size'],
    }
    this.orderDetailsService.UpdateOrderDetails(this.Order?.id,obj).subscribe(
      Data=>{
        console.log(Data);
        this.massege = "Update Order And Order Details";
      },
      ex=>{console.log(ex);}
    );
  }




  Values() {
    if (this.updateOrder.value['quantity'] == '') {
      this.updateOrder.value['quantity'] = this.Order?.quantity;
    }

    if (this.updateOrder.value['size'] == '') {
      this.updateOrder.value['size'] = this.Order?.size;
    }

    if (this.updateOrder.value['email'] == '') {
      this.updateOrder.value['email'] = this.Order?.order?.email;
    }

    if (this.updateOrder.value['name'] == '') {
      this.updateOrder.value['name'] = this.Order?.order?.name;
    }

    if (this.updateOrder.value['address'] == '') {
      this.updateOrder.value['address'] = this.Order?.order?.address;
    }

    if (this.updateOrder.value['city'] == '') {
      this.updateOrder.value['city'] = this.Order?.order?.city;
    }

    if (this.updateOrder.value['postalCode'] == '') {
      this.updateOrder.value['postalCode'] = this.Order?.order.postalCode;
    }

    if (this.updateOrder.value['phone'] == '') {
      this.updateOrder.value['phone'] = this.Order?.order?.phone;
    }

   }


}
