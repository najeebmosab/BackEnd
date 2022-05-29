import { ProductAPIService } from './../../../shared/Service/product-api.service';
import { ProductsAPI } from 'src/app/shared/model/products-api';
import { ImageAPIService } from './../../../shared/Service/image-apiservice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageAPI } from 'src/app/shared/model/image-api';
import { Galleria } from 'primeng/galleria';
import { CartProductService } from 'src/app/shared/Service/cart-product-service.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  @ViewChild('galleria') galleria: Galleria;

  idProduct: number;
  images: ImageAPI;
  showThumbnails: boolean;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  product:ProductsAPI;
  quantity = 1;
  size:any = '';
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
  isLogin = sessionStorage.getItem("Token");
  nameCategory='';
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageAPIService,
    private productService:ProductAPIService,
    private cartProductService:CartProductService
  ) {}

  ngOnInit(): void {
    this.idProduct = Number(this.route.snapshot.paramMap.get('id'));
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
      Data=>{
        this.product = Data;
        console.log("product",Data);
        this.nameCategory = this.product?.category?.categoryName;
        if (this.nameCategory === 'Shoes ') {
          this.size = 40;
        }
        else{
          this.size = 'M';
        }

      },
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

  AddCart() {
    if (sessionStorage.getItem('Token')) {
      let obj = {
        productId: this.idProduct,
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
    }else{
      alert("You Must Login");
    }
  }

  Quantity(op){
    switch(op)
    {
      case'+':
        this.quantity++;
        break;
      case'-':
        this.quantity--;
        break;
    }

    if(this.quantity <= 0)
    {
      this.quantity = 1;
    }
    if(this.quantity >= 10){
      this.quantity = 10;
    }
  }

  Size(par){
    this.size = par;
  }

}
