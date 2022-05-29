import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { AppSearch } from './directive/Search.directive';
import { OpenCloseSideBarDirective } from './directive/open-close-side-bar.directive';
import { DropdownNavBarDirective } from './directive/dropdown-nav-bar.directive';
import { SidebarDirective } from './directive/sidebar.directive';
import { ScrollNavBar } from './directive/ScrollNavBar.directive';
import { AuthGuard } from './guards/auth.guard';
import { FilterPipe } from './pipe/filter.pipe';
import { SortOrdersPipe } from './pipe/sort-orders.pipe';





@NgModule({
  declarations: [AppSearch,OpenCloseSideBarDirective, DropdownNavBarDirective, SidebarDirective,ScrollNavBar, FilterPipe, SortOrdersPipe],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports:[AppSearch,OpenCloseSideBarDirective,DropdownNavBarDirective,SidebarDirective,ScrollNavBar,FilterPipe,SortOrdersPipe],
  providers:[AuthGuard]
})
export class SharedModule { }
