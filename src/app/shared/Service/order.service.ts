import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  APIService = environment.Api+"Order";

  constructor(private http:HttpClient) { }

  GetOrderByUserId(){
    return this.http.get(this.APIService+"/GetOrderByUserId/"+sessionStorage.getItem("UserId")).pipe();
  }

  AddOrder(obj){
    return this.http.post(this.APIService,obj).pipe();
  }

  UpdateOrder(id,obj){
    return this.http.put(this.APIService+"/"+id,obj).pipe();

  }

  DeleteOrder(id){
    return this.http.delete(this.APIService+"/"+id).pipe();

  }
}
