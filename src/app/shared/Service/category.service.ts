import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  APIService = environment.Api + 'Category';
  constructor(private http: HttpClient) {}

  AddCategory(obj){
    return this.http.post(this.APIService,obj).pipe();
  }

  GETCategoryies() {
    return this.http.get(this.APIService).pipe();
  }

  UpdateCategory(id, obj) {
    return this.http.put(this.APIService + '/' + id, obj).pipe();
  }
  GETSingleCategory(id) {
    return this.http.get(this.APIService + '/' + id).pipe();
  }

  DeleteCategory(id) {
    return this.http.delete(this.APIService + '/' + id).pipe();
  }

   DELETECategoryWithoutProducts(id1, id2) {
   return this.http.delete(this.APIService + '/withoutProduct/' + id1 + '/' + id2).pipe();
  }
}
