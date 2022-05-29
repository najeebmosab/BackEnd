import { Location } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  isAdmin;
  constructor(private _Router:Router,private _Location:Location){
  }
  canActivate():boolean{
      this.isAdmin = sessionStorage.getItem('isAdmin');
      if(this.isAdmin ==="true")
      {
        return true;
      }
      else{
        alert("You Must Be Admin To Go Bashbord");
        this._Location.back();
      }



    }
  }
