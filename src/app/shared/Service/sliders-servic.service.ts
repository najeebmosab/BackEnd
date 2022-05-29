import { SlidersAPI } from './../model/sliders';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SlidersServic {
  APIService = environment.Api+"Sliders";
  Sliders:SlidersAPI;
  constructor(private http:HttpClient) { }

   GetSliders(){
     return  this.http.get(this.APIService).pipe()
  }

   GetSlider(id){
     return this.http.get(this.APIService+'/'+id).pipe();

   }

    AddSlider(obj:FormData){

    return this.http.post(this.APIService,obj).pipe();
   }

   UpdateSlider(obj:FormData,id){
    return this.http.put(this.APIService+'/'+id,obj).pipe();
   }

   DeleteSlider(id)
   {
      return this.http.delete(this.APIService+'/'+id).pipe();
   }
}
