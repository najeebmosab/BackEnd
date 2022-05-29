import { ImageAPIService } from './../../../shared/Service/image-apiservice.service';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { CategoryService } from 'src/app/shared/Service/category.service';
import { CategoryAPI } from './../../../shared/model/category-api';
import { BrandAPI } from './../../../shared/model/brand-api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/shared/Service/brand-service.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  massege = '';
  AddProduct: FormGroup;
  ImagesProduct: File[] = [];
  Categories: CategoryAPI;
  Brands: BrandAPI;
  productId;
  img;
  constructor(
    private productService: ProductAPIService,
    private categoryServices: CategoryService,
    private brandService: BrandService,
    private imageService: ImageAPIService
  ) {}

  ngOnInit(): void {
    this.AddProduct = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      salePrice: new FormControl('', [Validators.required]),
      actualPrice: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageProduct: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      brandId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });

    this.categoryServices.GETCategoryies().subscribe(
      (Data) => {
        this.Categories = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.brandService.GetBrands().subscribe(
      (Data) => {
        this.Brands = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  AddProducts() {
    if (this.AddProduct.valid) {
      const fd = new FormData();
      fd.append('brandId', this.AddProduct.value['brandId']);
      fd.append('categoryId', this.AddProduct.value['categoryId']);
      fd.append('productName', this.AddProduct.value['productName']);
      fd.append('price', this.AddProduct.value['price']);
      fd.append('salePrice', this.AddProduct.value['salePrice']);
      fd.append('quantity', this.AddProduct.value['quantity']);
      fd.append('shortDescription', this.AddProduct.value['shortDescription']);
      fd.append('description', this.AddProduct.value['description']);
      fd.append('imageProduct', this.ImagesProduct[0]);
      fd.append('gender', this.AddProduct.value['gender']);
      fd.append('actualPrice', this.AddProduct.value['actualPrice']);

      this.productService.ADDProducts(fd).subscribe(
        (Data: ProductsAPI) => {
          this.productId = Data.id;
          console.log("product Data",Data);
          this.AddImage();
        },
        (ex) => {
          console.log(ex);
        }
      );
    }

  }

  AddImage(){
    if (this.productId) {
      const imageFD = new FormData();
      imageFD.append("productId",this.productId);
      for (let index = 0; index < this.ImagesProduct.length; index++) {
        imageFD.append('images[]', this.ImagesProduct[index]);
      }
      this.imageService.AddImage(imageFD).subscribe(
        Data=>{this.massege = 'Add Product And Images Successesfull';},
        ex=>{}
      );
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.AddProduct.value['imageProduct'] = null;
    }
  }

  HandelFilesForImages(event: any) {
    debugger;
    if (event.target.files !== null && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        let img = event.target.files[index];
        console.log(img);
        this.ImagesProduct[index] = img;

        const reader = new FileReader();
        reader.readAsDataURL(this.ImagesProduct[index]);
      }
    } else {
      this.AddProduct.value['imageProduct'] = null;
    }
    console.log(this.ImagesProduct);
  }
}
