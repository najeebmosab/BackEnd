import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  APIService = environment.Api + 'Brands';
  constructor(private http: HttpClient) {}

  GetBrands() {
    return this.http.get(this.APIService).pipe();
  }
  GetBrand(id) {
    return this.http.get(this.APIService+"/"+id).pipe();
  }
  AddBrand(obj){
    return this.http.post(this.APIService,obj).pipe();
  }
  UpdateBrand(id,obj)
  {
    return this.http.put(this.APIService+'/'+id,obj).pipe();
  }

  DeleteBrand(id) {
    return this.http.delete(this.APIService + '/' + id).pipe();
  }

  DELETEBrandWithoutProducts(id1, id2) {
    return this.http.delete(this.APIService + '/withoutProduct/' + id1 + '/' + id2).pipe();
   }
}
