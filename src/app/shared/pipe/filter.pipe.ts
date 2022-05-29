import { ProductsAPI } from 'src/app/shared/model/products-api';
import { Pipe, PipeTransform } from '@angular/core';
import { AnyAaaaRecord } from 'dns';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(arr: ProductsAPI[], SortVal: any): unknown {
    debugger;

    if (SortVal == 'A') {

      return arr.sort((a,b)=>a.productName.localeCompare(b.productName));

    } else if(SortVal=="Z"){
      return arr.sort((a,b)=>b.productName.localeCompare(a.productName))
    }
    else if(SortVal == 0){
      return arr.sort((a,b)=>a.price - b.price);
    }
    else{
      return arr.sort((a,b)=>b.price - a.price);
    }
  }
}
