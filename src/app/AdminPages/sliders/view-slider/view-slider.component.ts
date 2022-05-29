import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlidersAPI } from 'src/app/shared/model/sliders';
import { SlidersServic } from 'src/app/shared/Service/sliders-servic.service';

@Component({
  selector: 'app-view-slider',
  templateUrl: './view-slider.component.html',
  styleUrls: ['./view-slider.component.css'],
})
export class ViewSliderComponent implements OnInit {
  id;
  slider:SlidersAPI;
  constructor(
    private sliderService: SlidersServic,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sliderService.GetSlider(this.id).subscribe(
      Data=>{this.slider = Data},
      ex=>{console.log(ex);}
    );
  }
}
