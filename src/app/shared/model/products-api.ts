import { BrandAPI } from './brand-api';
import { CategoryAPI } from './category-api';
import { ImageAPI } from './image-api';
export class ProductsAPI {
  id?:number;
  brandId?:number;
  categoryId?:number;
  productName?:string;
  price?:number;
  salePrice?:number;
  actualPrice?:number;
  quantity?:string;
  shortDescription?:string;
  description?:string;
  imageProduct?:string;
  gender?:string;
  image?:ImageAPI;
  category?:CategoryAPI;
  brand?:BrandAPI;
}
