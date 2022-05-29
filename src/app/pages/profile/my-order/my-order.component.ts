import { Order } from './../../../shared/model/order';
import { OrderService } from './../../../shared/Service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  Orders: Order[] = [];
  ngOnInit(): void {
    this.orderService.GetOrderByUserId().subscribe(
      (Data: Array<Order>) => {
        console.log(Data);
        this.Orders = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  DeleteProductFromCart(id) {
    this.orderService.DeleteOrder(id).subscribe(
      (Data) => {
        console.log(Data);
        this.ngOnInit();
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}
