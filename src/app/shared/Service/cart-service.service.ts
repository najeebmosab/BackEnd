import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  APIService = environment.Api + 'Cart';
  constructor(private http: HttpClient) {}

  AddCart(obj){
    return this.http.post(this.APIService,obj).pipe();
  }

  GetCart(id) {
    return this.http.get(this.APIService+"/usersid/"+id).pipe();
  }

  UpdateCart(id, obj) {
    return this.http.put(this.APIService + '/' + id, obj).pipe();
  }

  DeleteCart(id) {
    return this.http.delete(this.APIService + '/' + id).pipe();
  }
}
