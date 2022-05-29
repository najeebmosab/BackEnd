import { ImageAPIService } from './../../../shared/Service/image-apiservice.service';
import { BrandService } from './../../../shared/Service/brand-service.service';
import { CategoryService } from './../../../shared/Service/category.service';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductAPIService } from 'src/app/shared/Service/product-api.service';
import { CategoryAPI } from 'src/app/shared/model/category-api';
import { BrandAPI } from 'src/app/shared/model/brand-api';
import { ImageAPI } from 'src/app/shared/model/image-api';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css'],
})
export class UpdateProductsComponent implements OnInit {
  //viruable use in this page to update product
  UpdateProduct: FormGroup;
  product: ProductsAPI;
  id;
  massege = '';
  img;
  Categories: CategoryAPI;
  Brands: BrandAPI;
  images: ImageAPI;
  ImagesProduct:File[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductAPIService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private imageService: ImageAPIService
  ) {}

  ngOnInit(): void {
    this.UpdateProduct = new FormGroup({
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
    //get id from url
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    //get product
    this.productService.GETProduct(this.id).subscribe(
      (Data) => {
        this.product = Data;
        this.images = this.product?.image;
        console.log(this.product);
      },
      (ex) => {
        console.log(ex);
      }
    );
    //get brands
    this.brandService.GetBrands().subscribe(
      (Data) => {
        this.Brands = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );

    //get categoryies
    this.categoryService.GETCategoryies().subscribe(
      (Data) => {
        this.Categories = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  UpdateProducts() {
    this.Values();
    if (this.UpdateProduct.value) {
      const fd = new FormData();
      fd.append('brandId', this.UpdateProduct.value['brandId']);
      fd.append('categoryId', this.UpdateProduct.value['categoryId']);
      fd.append('actualPrice', this.UpdateProduct.value['actualPrice']);
      fd.append('description', this.UpdateProduct.value['description']);
      fd.append('productName', this.UpdateProduct.value['productName']);
      fd.append('price', this.UpdateProduct.value['price']);
      fd.append('salePrice', this.UpdateProduct.value['salePrice']);
      fd.append('quantity', this.UpdateProduct.value['quantity']);
      fd.append(
        'shortDescription',
        this.UpdateProduct.value['shortDescription']
      );
      fd.append('gender', this.UpdateProduct.value['gender']);

      if (this.img != null) {
        fd.append('imageProduct', this.img);
      } else {
        fd.append('imageProduct', this.product.imageProduct);
      }

      this.productService.UPDATEProduct(fd, this.id).subscribe(
        (Data) => {
          this.massege = 'Update Product Is Successfull';
          this.AddImage();
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      this.massege = 'Error Update Product';
    }
  }

  AddImage(){
    debugger
    if (this.id) {
      const imageFD = new FormData();
      imageFD.append("productId",this.id);
      for (let index = 0; index < this.ImagesProduct.length && index < 4; index++) {
        imageFD.append('images', this.ImagesProduct[index]);
      }
      this.imageService.AddImage(imageFD).subscribe(
        Data=>{this.massege = 'Add Product And Images Successesfull';},
        ex=>{console.log(ex);}
      );
    }
  }

  DeleteImage(id) {
    debugger;
    this.imageService.DeleteImage(id).subscribe(
      (Data) => {
      this.ngOnInit();
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.UpdateProduct.value['imageProduct'] = null;
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
      this.UpdateProduct.value['imageProduct'] = null;
    }
    console.log(this.ImagesProduct);
  }

  Values() {
    if (this.UpdateProduct.value['actualPrice'] == '') {
      this.UpdateProduct.value['actualPrice'] = this.product.actualPrice;
    }

    if (this.UpdateProduct.value['brandId'] == '') {
      this.UpdateProduct.value['brandId'] = this.product.brandId;
    }

    if (this.UpdateProduct.value['categoryId'] == '') {
      this.UpdateProduct.value['categoryId'] = this.product.categoryId;
    }

    if (this.UpdateProduct.value['description'] == '') {
      this.UpdateProduct.value['description'] = this.product.description;
    }

    if (this.UpdateProduct.value['gender'] == '') {
      this.UpdateProduct.value['gender'] = this.product.gender;
    }

    if (this.UpdateProduct.value['imageProduct'] == '') {
      this.UpdateProduct.value['imageProduct'] = this.product.imageProduct;
    }

    if (this.UpdateProduct.value['price'] == '') {
      this.UpdateProduct.value['price'] = this.product.price;
    }

    if (this.UpdateProduct.value['productName'] == '') {
      this.UpdateProduct.value['productName'] = this.product.productName;
    }

    if (this.UpdateProduct.value['quantity'] == '') {
      this.UpdateProduct.value['quantity'] = this.product.quantity;
    }

    if (this.UpdateProduct.value['salePrice'] == '') {
      this.UpdateProduct.value['salePrice'] = this.product.salePrice;
    }
    if (this.UpdateProduct.value['salePrice'] == null) {
      this.UpdateProduct.value['salePrice'] = 0;
    }

    if (this.UpdateProduct.value['shortDescription'] == '') {
      this.UpdateProduct.value['shortDescription'] =
        this.product.shortDescription;
    }
  }
}
