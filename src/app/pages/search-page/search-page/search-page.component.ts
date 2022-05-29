import { ProductsAPI } from './../../../shared/model/products-api';
import { ProductAPIService } from 'src/app/shared/Service/product-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProductService } from 'src/app/shared/Service/cart-product-service.service';
import { CategoryService } from 'src/app/shared/Service/category.service';
import { BrandService } from 'src/app/shared/Service/brand-service.service';
import { CategoryAPI } from 'src/app/shared/model/category-api';
import { BrandAPI } from 'src/app/shared/model/brand-api';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  idCategory: number;
  totalRecords = 0;
  page: number = 1;
  Products: ProductsAPI[] = [];
  OpenCloseListSort:boolean = false;
  OpenCloseListCategory:boolean = false;
  OpenCloseListBrand:boolean = false;
  sort:any = '';
  categories:CategoryAPI[]=[];
  brands:BrandAPI[]=[];

  constructor
  (
    private route: ActivatedRoute,
    private productService: ProductAPIService,
    private cartProductService: CartProductService,
    private categoryService:CategoryService,
    private brandService:BrandService
    ) {}

  ngOnInit(): void {
    this.productService.SEARCHProducts().subscribe(
      (Data: Array<ProductsAPI>) => {
        this.Products = Data;
        console.log(this.Products);
        this.totalRecords = Data.length;
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.categoryService.GETCategoryies().subscribe(
      (Data:Array<CategoryAPI>)=>{this.categories = Data},
      ex=>{console.log(ex);}
    );

    this.brandService.GetBrands().subscribe(
      (Data:Array<BrandAPI>)=>{this.brands = Data},
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
}
