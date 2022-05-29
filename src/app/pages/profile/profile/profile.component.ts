import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isActive = false;
  constructor() { }

  ngOnInit(): void {
  }

  IsActive(){
    this.isActive = !this.isActive;
  }
}
