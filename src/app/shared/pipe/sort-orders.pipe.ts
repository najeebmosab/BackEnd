import { Pipe, PipeTransform } from '@angular/core';
import { OrderDetails } from '../model/order-details';

@Pipe({
  name: 'sortOrders',
})
export class SortOrdersPipe implements PipeTransform {
  transform(arr: OrderDetails[], SortVal: any): unknown {
    debugger;
    let newData: OrderDetails[] = [];

    if (arr != null && SortVal != '') {
      for (let j = 0; j < SortVal.length; j++) {
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i]?.update_AT.substring(0, 7) == SortVal[j].substring(0, 7) &&
            arr[i]?.isOrder == true
          ) {
            newData.push(arr[i]);
          }
        }
      }
    }
    if (SortVal == '') {
      return arr;
    }
    return newData;
  }
}
