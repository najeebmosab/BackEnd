import { BrandService } from 'src/app/shared/Service/brand-service.service';
import { BrandAPI } from './../../../shared/model/brand-api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {
  massege="";
  UpdateBrand:FormGroup;
  id;
  Brand:BrandAPI;
  img;
  constructor(private activatedRoute: ActivatedRoute,private brandService:BrandService) { }

  ngOnInit(): void {
    this.UpdateBrand = new FormGroup({
      name : new FormControl('', [Validators.required]),
      image : new FormControl('', [Validators.required]),
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.brandService.GetBrand(this.id).subscribe(
      Data=>{this.Brand = Data},
      ex=>{console.log(ex);},
    );
  }
  UpdateBrands(){
    this.Values();
    if (this.UpdateBrand.value) {
      const fd= new FormData();
      fd.append("name",this.UpdateBrand.value["name"]);
      if (this.img != null) {
        fd.append("image",this.img);
      }
      else{
        fd.append("image",this.Brand.image);
      }

      this.brandService.UpdateBrand(this.id,fd).subscribe(
        Data=>{this.massege="Update Brand is Sccessfull";this.ngOnInit();},
        ex=>{console.log(ex);},
      );
    }
  }
  Values() {
    if (this.UpdateBrand.value['name'] == "") {
      this.UpdateBrand.value['name'] = this.Brand.name;
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.UpdateBrand.value['image'] = null;
    }
  }

}
