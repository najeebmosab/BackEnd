import { BrandService } from './../../../shared/Service/brand-service.service';
import { BrandAPI } from './../../../shared/model/brand-api';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-brand',
  templateUrl: './show-brand.component.html',
  styleUrls: ['./show-brand.component.css'],
})
export class ShowBrandComponent implements OnInit {
  massege = '';
  Brands: BrandAPI[] = [];
  totalRecords = 0;
  page: number = 1;
  switchBrand: FormGroup;
  idBrand;
  constructor(private brandsService: BrandService) {}
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  ngOnInit(): void {
    this.brandsService.GetBrands().subscribe(
      (Data: Array<BrandAPI>) => {
        this.Brands = Data;
        this.totalRecords = Data.length;
      },
      (ex) => {
        console.log(ex);
      }
    );
    this.switchBrand = new FormGroup({
      newBrand: new FormControl('', [Validators.required]),
    });
  }

  DeleteBrand(par) {
    this.idBrand = par;
    if (confirm('Are You Sure To Delete This Category With All Products?')) {
      this.brandsService.DeleteBrand(par).subscribe(
        (Data) => {
          this.massege = 'Delete Category Is Sccessfull';
          this.ngOnInit();
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      if (
        confirm('Are You Sure To Delete This Category WithOut All Products?')
      ) {
        this.showDialog();
      }
    }
  }

  UpdateBrand() {
    if (this.switchBrand.valid) {
      this.brandsService
        .DELETEBrandWithoutProducts(
          this.idBrand,
          this.switchBrand.value['newBrand']
        )
        .subscribe(
          (Data) => {
            console.log(Data);
            this.ngOnInit();
          },
          (ex) => {
            console.log(ex);
          }
        );
    }
  }
}
