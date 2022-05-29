import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLandingRoutingModule } from './admin-landing-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [DashbordComponent,],
  imports: [
    CommonModule,
    AdminLandingRoutingModule,
    SharedModule,
    MenubarModule,
    SidebarModule,

  ]
})
export class AdminLandingModule { }
