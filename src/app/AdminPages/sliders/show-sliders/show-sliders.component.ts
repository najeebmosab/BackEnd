import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { SlidersAPI } from 'src/app/shared/model/sliders';
import { SlidersServic } from 'src/app/shared/Service/sliders-servic.service';

@Component({
  selector: 'app-show-sliders',
  templateUrl: './show-sliders.component.html',
  styleUrls: ['./show-sliders.component.css'],
})
export class ShowSlidersComponent implements OnInit {
  Sliders: SlidersAPI[] = [];
  massege = '';
  totalRecords = 0;
  page:number=1;
  constructor(private slidersService: SlidersServic, private router: Router) {}

   ngOnInit() {
    this.slidersService.GetSliders().subscribe(
      (Data:Array<SlidersAPI>)=>{this.Sliders = Data;this.totalRecords = Data.length},
      ex=>{console.log(ex);}
    )

  }

  DeleteSlider(par) {

      this.slidersService.DeleteSlider(par).subscribe(
        (Data) => {
          this.massege = 'Slider is Delete Successful';
          this.ngOnInit();
        },
        (ex) => {
          console.log(ex);
        }
      );
  }
}
