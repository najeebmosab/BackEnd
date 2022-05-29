import { BrandService } from 'src/app/shared/Service/brand-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  AddBrand:FormGroup;
  img;
  massege="";
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.AddBrand = new FormGroup({
      name:new FormControl('', [Validators.required]),
      image:new FormControl('', [Validators.required]),
    });
  }

  AddBrands(){
    debugger
    if (this.AddBrand.valid) {
      const fd = new FormData();
      fd.append("name",this.AddBrand.value["name"]);
      fd.append("image",this.img);
      this.brandService.AddBrand(fd).subscribe(
        Data=>{this.massege="Add Brand is Sccessfull"},
        ex=>{console.log(ex);}
      );
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.AddBrand.value['image'] = null;
    }
  }
}
