import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageAPIService{

  APIService = environment.Api+"Images";
    constructor(private http:HttpClient) { }

    GetImage(id){
      return this.http.get(this.APIService+'/'+id).pipe();
    }

    AddImage(obj:any){
      debugger;
      return this.http.post(this.APIService,obj).pipe();
    }

    GetImagesByProductId(id){
      debugger
      return this.http.post(this.APIService+"/GetImagesByProductId",id).pipe();
    }

    UpdateImage(id,obj)
    {
      debugger;
        return this.http.put(this.APIService+'/'+id,obj).pipe();
    }

    DeleteImage(id)
    {
      return this.http.delete(this.APIService+'/'+id).pipe();
    }

}
