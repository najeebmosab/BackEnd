import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  APIService = environment.Api + 'OrderDetails';

  constructor(private http: HttpClient) {}

  GetOrderDetailsS() {
    return this.http.get(this.APIService).pipe();
  }
  GetOrderDetails(id) {
    return this.http.get(this.APIService+"/"+id).pipe();
  }

  GetByOrderId(id) {
    return this.http.get(this.APIService+"/GetByOrderId/"+id).pipe();
  }

  AddOrderDetails(obj) {
    return this.http.post(this.APIService, obj).pipe();
  }

  UpdateOrderDetails(id,obj){
    return this.http.put(this.APIService+'/'+id,obj).pipe();
  }

  DeleteOrderDetails(id)
  {
    return this.http.delete(this.APIService+'/'+id).pipe();

  }
  SendEmail(obj){
    debugger
   return this.http.post("https://localhost:44342/api/SendEmail",obj).pipe();
  }

  SendEmailCheckCode(obj){
   return this.http.post("https://localhost:44342/api/SendEmail/CheckCode",obj).pipe();
  }
}
