import { BrandService } from 'src/app/shared/Service/brand-service.service';
import { BrandAPI } from 'src/app/shared/model/brand-api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrls: ['./view-brand.component.css']
})
export class ViewBrandComponent implements OnInit {
  id;
  Brand:BrandAPI;
  constructor(private activatedRoute: ActivatedRoute,private brandService:BrandService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.brandService.GetBrand(this.id).subscribe(
      Data=>{this.Brand = Data},
      ex=>{console.log(ex);}
    );
  }

}
