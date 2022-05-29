import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {
  save:any;
  searchies:string;
  productId=0;
  APIService = environment.Api+"Products";
  constructor(private http:HttpClient) { }

  GETProducts()
  {
   return  this.http.get(this.APIService).pipe();
  }
  GETProduct(id)
  {
    return  this.http.get(this.APIService+"/"+id).pipe();
  }

  UPDATEProduct(obj,id){
    return this.http.put(this.APIService+'/'+id,obj).pipe();
  }

  DeleteProduct(id)
  {
     return this.http.delete(this.APIService+"/"+id).pipe();
  }

  ADDProducts(obj:any)
  {
    debugger;
      return this.http.post(this.APIService,obj).pipe();
  }

   SEARCHProducts()
  {
debugger;
     let productName =sessionStorage.getItem("SearchName")
    // let headers = new HttpHeaders().append('Content-Type','application/json;charset=utf-8');
    // {headers,responseType:"json"}
   return  this.http.get(this.APIService+"/GetByName/"+productName).pipe();
  }

   GetProductsSaleProduct(){
    return  this.http.get("https://localhost:44342/api/Products/DisCount").pipe();
  }
   GetNewProduct(){
    return  this.http.get(this.APIService+"/NewProducts").pipe();

  }

  GetProductCategoryId(id){
    return this.http.get(this.APIService+"/ByCatagoryId/"+id).pipe();
  }

  GetProductCategoryIdAndBrand(id,id2)
  {
    return this.http.get(this.APIService+"/ByCatagoryIdAndBrandId/"+id2+"/"+id).pipe();
  }
}
