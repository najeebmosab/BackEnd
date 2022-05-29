import { OrderDetailsService } from './../../../shared/Service/order-details.service';
import { Order } from './../../../shared/model/order';
import { OrderService } from './../../../shared/Service/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from './../../../shared/Service/user-api.service';
import { UserAPI } from './../../../shared/model/user-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageAPI } from 'src/app/shared/model/image-api';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { CartProductService } from 'src/app/shared/Service/cart-product-service.service';
import { ImageAPIService } from 'src/app/shared/Service/image-apiservice.service';
import { ProductAPIService } from 'src/app/shared/Service/product-api.service';
import { Galleria } from 'primeng/galleria';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
})
export class BuyNowComponent implements OnInit {
  @ViewChild('galleria') galleria: Galleria;
  idProduct: number;
  images: ImageAPI;
  showThumbnails: boolean;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  product: ProductsAPI;
  quantity = 1;
  size;
  user:UserAPI;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  massage;
  formOrder: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageAPIService,
    private productService: ProductAPIService,
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService,
    private activatedRoute: ActivatedRoute,
    private userService: UserAPIService,
  ) {}

  ngOnInit(): void {
    this.formOrder = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    });

    this.idProduct = Number(this.route.snapshot.paramMap.get('id'));
    this.quantity = Number(
      this.activatedRoute.snapshot.queryParamMap.get('quantity')
    );
    this.size = this.activatedRoute.snapshot.queryParamMap.get('size');
    console.log(this.size);
    console.log(this.quantity);
    this.imageService.GetImagesByProductId(this.idProduct).subscribe(
      (Data) => {
        console.log(Data);
        this.images = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.productService.GETProduct(this.idProduct).subscribe(
      (Data) => {
        (this.product = Data), console.log('product', Data);
      },
      (ex) => {
        console.log(ex);
      }
    );

    this.userService.getSingelUsers().subscribe(
      Data=>{this.user = Data,console.log("user Email",this.user);},
      ex=>{console.log(ex);}
    );
  }
  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
      /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
      /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
      /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    } else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    } else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener(
      'mozfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'msfullscreenchange',
      this.onFullScreenListener
    );
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${
      this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'
    }`;
  }

  BuyNow() {
    debugger;
    if (this.formOrder.valid) {
      let price = 0;
      if (this.product.salePrice > 0) {
        price = this.product.salePrice;
      } else {
        price = this.product.price;
      }
      let order = {
        userId: sessionStorage.getItem('UserId'),
        name: this.formOrder.value['name'],
        email: this.user.email,
        address: this.formOrder.value['address'],
        city: this.formOrder.value['city'],
        postalCode: this.formOrder.value['postalCode'],
        phone: this.formOrder.value['phone'],
        total: price * this.quantity,
      };

      this.orderService.AddOrder(order).subscribe(
        (Data: Order) => {
          console.log(Data);
          sessionStorage.setItem('orderId', Data.id.toString());
          this.AddOrderDetails();
        },
        (ex) => {
          console.log(ex);
        }
      );
    }
  }

  AddOrderDetails() {
    let price = 0;
    if (this.product.salePrice > 0) {
      price = this.product.salePrice;
    } else {
      price = this.product.price;
    }
    let OrderDetails = {
      orderId: sessionStorage.getItem('orderId'),
      categoryId: this.product.categoryId,
      brandId: this.product.brandId,
      productImage: this.product.imageProduct,
      productName: this.product.productName,
      productPrice: price,
      productDescription: this.product.description,
      quantity:this.quantity,
      size:this.size,
      isOrder: false,
    };
    this.orderDetailsService.AddOrderDetails(OrderDetails).subscribe(
      Data=>{console.log(Data);this.massage="Add Order Is Successfull"},
      ex=>{console.log(ex);}
    );
  }
}
