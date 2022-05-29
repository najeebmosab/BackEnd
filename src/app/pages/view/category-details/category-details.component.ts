import { BrandAPI } from './../../../shared/model/brand-api';
import { CategoryAPI } from './../../../shared/model/category-api';
import { BrandService } from './../../../shared/Service/brand-service.service';
import { CategoryService } from './../../../shared/Service/category.service';
import { ProductsAPI } from './../../../shared/model/products-api';
import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProductService } from 'src/app/shared/Service/cart-product-service.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  idCategory: number;
  totalRecords = 0;
  page: number = 1;
  Products: ProductsAPI[] = [];
  OpenCloseListSort:boolean = false;
  OpenCloseListCategory:boolean = false;
  sort:any = '';
  categories:CategoryAPI;
  brands:BrandAPI;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductAPIService,
    private cartProductService: CartProductService,
    private categoryService:CategoryService,
    private brandService:BrandService
  ) {}

  ngOnInit(): void {
    this.idCategory = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.GetProductCategoryId(this.idCategory).subscribe(
      (Data: Array<ProductsAPI>) => {
        this.Products = Data;
        this.totalRecords = Data.length;
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.categoryService.GETCategoryies().subscribe(
      Data=>{this.categories = Data},
      ex=>{console.log(ex);}
    );

    this.brandService.GetBrands().subscribe(
      Data=>{this.brands = Data},
      ex=>{console.log(ex);}
    );
  }

  AddCart(par) {
    if (sessionStorage.getItem('Token')) {
      let obj = {
        productId: par,
        cartId: Number(sessionStorage.getItem('CartId')),
        quantity: 1,
      };
      this.cartProductService.AddCart(obj).subscribe(
        (Data) => {
          console.log(Data);
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      alert('You Must Login');
    }
  }

  Sorting(par,item)
  {
    this.sort = par;
  }

  CategoryBrand(id,id2){
    debugger
    this.productService.GetProductCategoryIdAndBrand(id,id2).subscribe(
      (Data:Array<ProductsAPI>)=>{this.Products = Data;console.log(Data);},
      ex=>{console.log(ex);}
    );
  }

  OpenCloseListBrand(i){
    debugger;
    console.log(i);
        let ul = document.getElementsByClassName('brand_ul').item(i);
        if (ul.className.includes('closes')) {
            ul.classList.remove('closes');
            ul.classList.remove('d-none');
        } else {
            ul.classList.add('closes');

            ul.classList.add('d-none');
        }
  }
}
