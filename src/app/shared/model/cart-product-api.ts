import { ProductsAPI } from 'src/app/shared/model/products-api';
export class CartProductAPI {
  id?:number;
  productId?:number;
  cartId?:number;
  quantity?:number;
  products:ProductsAPI
}
