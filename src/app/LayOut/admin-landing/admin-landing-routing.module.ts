import { AddOrdersComponent } from './../../AdminPages/orders/add-orders/add-orders.component';
import { EditOrdersComponent } from './../../AdminPages/orders/edit-orders/edit-orders.component';
import { ShowOrdersComponent } from './../../AdminPages/orders/show-orders/show-orders.component';
import { AddBrandComponent } from './../../AdminPages/brands/add-brand/add-brand.component';
import { ViewBrandComponent } from './../../AdminPages/brands/view-brand/view-brand.component';
import { UpdateBrandComponent } from './../../AdminPages/brands/update-brand/update-brand.component';
import { ViewCategoryComponent } from './../../AdminPages/categories/view-category/view-category.component';
import { UpdateCategoryComponent } from './../../AdminPages/categories/update-category/update-category.component';
import { AddCategoryComponent } from  './../../AdminPages/categories/add-category/add-category.component';
import { ShowCategoryComponent } from './../../AdminPages/categories/show-category/show-category.component';
import { ViewUsersComponent } from './../../AdminPages/users/view-users/view-users.component';
import { UpdateUsersComponent } from './../../AdminPages/users/update-users/update-users.component';
import { AddUsersComponent } from './../../AdminPages/users/add-users/add-users.component';
import { ShowUsersComponent } from './../../AdminPages/users/show-users/show-users.component';
import { UpdateImagesComponent } from './../../AdminPages/images/update-images/update-images.component';
import { ShowProductsComponent } from 'src/app/AdminPages/product/show-products/show-products.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AddSlidersComponent } from 'src/app/AdminPages/sliders/add-sliders/add-sliders.component';
import { ShowSlidersComponent } from 'src/app/AdminPages/sliders/show-sliders/show-sliders.component';
import { UpdateSlidersComponent } from 'src/app/AdminPages/sliders/update-sliders/update-sliders.component';
import { ViewSliderComponent } from 'src/app/AdminPages/sliders/view-slider/view-slider.component';
import { AddProductsComponent } from 'src/app/AdminPages/product/add-products/add-products.component';
import { UpdateProductsComponent } from 'src/app/AdminPages/product/update-products/update-products.component';
import { ViewProductsComponent } from 'src/app/AdminPages/product/view-products/view-products.component';
import { ShowBrandComponent } from 'src/app/AdminPages/brands/show-brand/show-brand.component';



const routes: Routes = [
  {path:'',redirectTo:'Dashbord/Show-Order',pathMatch:'full'},

  {path:'Dashbord',component:DashbordComponent,children: [
    //Slider Pathies
    {path:'Show-Sliders',canActivate:[AuthGuard],component:ShowSlidersComponent},
    {path:"Add-Sliders",canActivate:[AuthGuard],component:AddSlidersComponent},
    {path:"Update-Sliders/:id",canActivate:[AuthGuard],component:UpdateSlidersComponent},
    {path:"View-Sliders/:id",canActivate:[AuthGuard],component:ViewSliderComponent},

    //Products Pathies
    {path:'Show-Products',canActivate:[AuthGuard],component:ShowProductsComponent},
    {path:'Add-Products',canActivate:[AuthGuard],component:AddProductsComponent},
    {path:'View-Products/:id',canActivate:[AuthGuard],component:ViewProductsComponent},
    {path:"Update-Products/:id",canActivate:[AuthGuard],component:UpdateProductsComponent},

    //Images Pathies
    {path:"Update-Image/:id",canActivate:[AuthGuard],component:UpdateImagesComponent},

    //Users Pathies
    {path:'Show-Users',canActivate:[AuthGuard],component:ShowUsersComponent},
    {path:'Add-Users',canActivate:[AuthGuard],component:AddUsersComponent},
    {path:"Update-Users/:id",canActivate:[AuthGuard],component:UpdateUsersComponent},
    {path:'View-Users/:id',canActivate:[AuthGuard],component:ViewUsersComponent},

    //Category Pathies
    {path:'Show-Category',canActivate:[AuthGuard],component:ShowCategoryComponent},
    {path:'Add-Category',canActivate:[AuthGuard],component:AddCategoryComponent},
    {path:"Update-Category/:id",canActivate:[AuthGuard],component:UpdateCategoryComponent},
    {path:'View-Category/:id',canActivate:[AuthGuard],component:ViewCategoryComponent},

    //Brands Pathies
    {path:'Show-Brand',canActivate:[AuthGuard],component:ShowBrandComponent},
    {path:'Add-Brand',canActivate:[AuthGuard],component:AddBrandComponent},
    {path:"Update-Brand/:id",canActivate:[AuthGuard],component:UpdateBrandComponent},
    {path:'View-Brand/:id',canActivate:[AuthGuard],component:ViewBrandComponent},

    //Orders Pathies
    {path:'Show-Order',canActivate:[AuthGuard],component:ShowOrdersComponent},
    {path:'Update-Order/:id',canActivate:[AuthGuard],component:EditOrdersComponent},
    {path:"Add-Order",canActivate:[AuthGuard],component:AddOrdersComponent},


  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLandingRoutingModule { }
