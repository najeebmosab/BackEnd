import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingLayOutComponent } from './landing-lay-out/landing-lay-out.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import {SidebarModule} from 'primeng/sidebar';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [NavBarComponent, LandingLayOutComponent, FooterComponent, NotFoundComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
    SharedModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LandingModule { }
