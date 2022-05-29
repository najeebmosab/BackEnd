import { FormControl, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { SendEmail } from './../../../shared/model/SendEmail';
import { OrderDetails } from './../../../shared/model/order-details';
import { OrderDetailsService } from 'src/app/shared/Service/order-details.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css'],
})
export class ShowOrdersComponent implements OnInit {
  constructor(private orderService: OrderDetailsService) {}
  //virabel use in class
  selectGroup: FormGroup;
  Orders: OrderDetails[] = [];
  isOrder = false;
  totalRecords = 0;
  page: number = 1;
  TotalPrice: number;
  Tarek: string[] = [];
  SartYear = '2022-01-01';
  date: Date;
  toDay = '';
  SortCondition: any = [];
  openDate=false;
  ngOnInit(): void {
    this.selectGroup = new FormGroup({
      selectGroup: new FormControl('', []),
    });

    this.TotalPrice = 0;
    sessionStorage.setItem('i', '1');
    this.date = new Date();
    this.orderService.GetOrderDetailsS().subscribe(
      (Data: Array<OrderDetails>) => {
        console.log('Data to Day', Data);
        this.Orders = Data;
        sessionStorage.setItem('OrderDetails', JSON.stringify(Data));
        this.totalRecords = Data.length;
        debugger;
        if (this.date.toLocaleDateString().substring(4, 5) == '/') {
          this.toDay = this.date.toLocaleDateString().substring(5, 9);
        } else {
          this.toDay = this.date.toLocaleDateString().substring(4, 9);
        }
        if (this.date.toLocaleDateString().substring(0, 1) > '9') {
          this.toDay += '-' + this.date.toLocaleDateString().substring(0, 1);
        } else {
          this.toDay += '-0' + this.date.toLocaleDateString().substring(0, 1);
        }
        console.log('toDay', this.toDay);

        for (let i = 0; i < Data.length; i++) {
          const element = Data[i];
          let D1 = element?.update_AT.substring(0, 7);
          if (D1 == this.toDay && element.isOrder == true) {
            this.TotalPrice += element.productPrice;
          }
        }
      },
      (ex) => {
        console.log(ex);
      }
    );
    let NextYear = this.date.getFullYear() + 1 + '-01-01';
    console.log('Year', NextYear);

    for (; this.SartYear < NextYear; ) {
      if (Number(sessionStorage.getItem('i')) < 10) {
        this.SartYear =
          this.SartYear.substring(0, 6) +
          Number(sessionStorage.getItem('i')) +
          '-01';
      } else if (Number(sessionStorage.getItem('i')) > 12) {
        sessionStorage.setItem('i', String(1));
        this.SartYear = Number(this.SartYear.substring(0, 4)) + 1 + '-01-01';
      } else {
        this.SartYear =
          this.SartYear.substring(0, 5) +
          Number(sessionStorage.getItem('i')) +
          '-01';
      }
      sessionStorage.setItem(
        'i',
        String(Number(sessionStorage.getItem('i')) + 1)
      );
      this.Tarek.push(this.SartYear);
    }
    // console.log(this.datePipe.transform(this.dates, 'shortDate'));
  }

  GetOrderById(id) {
    return this.Orders.find((A) => A.id === id);
  }

  ActiveOrder(id, email) {
    var res = this.GetOrderById(id);
    console.log('res', res);
    res.isOrder = !res.isOrder;
    debugger;
    this.orderService.UpdateOrderDetails(id, res).subscribe(
      (Data) => {
        console.log(Data);

        const fd = new FormData();
        fd.append('From', 'najeebmosab@gmail.com');
        fd.append('To', email);
        fd.append('Subject', 'From Eccomers Web Site');
        fd.append('Body', ``);
        fd.append('OrderId', String(res.id));
        fd.append('Description', res?.productDescription);
        fd.append('ProductName', res?.productName);
        fd.append('Price', String(res?.productPrice * res?.quantity));
        fd.append('Quantity', String(res?.quantity));
        fd.append(
          'File',
          ' https://localhost:44342/images/products/' + res?.productImage
        );
        if (res.isOrder == true) {
          this.orderService.SendEmail(fd).subscribe(
            (Data) => {
              console.log('Done');
            },
            (ex) => {
              console.log(ex);
            }
          );
        }
        this.ngOnInit();
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
  DeleteOrder(id) {
    this.orderService.DeleteOrderDetails(id).subscribe(
      (Data) => {
        console.log(Data);
        this.ngOnInit();
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  MonethInYear() {
    return Number(sessionStorage.getItem('i'));
  }

  Sorting() {
    debugger;
    this.SortCondition = this.selectGroup.value['selectGroup'];
    this.TotalPrice = 0;
    let Data: Array<OrderDetails> = JSON.parse(
      sessionStorage.getItem('OrderDetails')
    );
    for (let j = 0; j < this.SortCondition.length; j++) {
      for (let i = 0; i < Data.length; i++) {
        if (
          Data[i].update_AT.substring(0, 7) ==
            this.SortCondition[j].substring(0, 7) &&
          Data[i]?.isOrder == true
        ) {
          this.TotalPrice += Data[i]?.productPrice;
        }
      }
    }
  }
}
