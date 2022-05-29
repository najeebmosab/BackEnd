import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  APIService = environment.Api + 'CartProduct';
  constructor(private http: HttpClient) {}

  AddCart(obj){
    debugger;
    return this.http.post(this.APIService,obj).pipe();
  }

  GetCart(cartId) {
    debugger;
    return this.http.post(this.APIService+"/GetProductByCartId",Number(cartId)).pipe();
  }

  GetCartProduct(cartId) {
    return this.http.get(this.APIService+"/"+cartId).pipe();
  }

  UpdateCart(id, obj) {
    debugger;
    return this.http.put(this.APIService + '/' + id, obj).pipe();
  }

  DeleteCart(id) {
    debugger
    return this.http.delete(this.APIService+"/"+id).pipe();
  }}
