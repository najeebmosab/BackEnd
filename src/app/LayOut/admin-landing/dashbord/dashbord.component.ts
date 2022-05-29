import { Component, OnInit, DoCheck } from '@angular/core';
import { WidthSidebarService } from 'src/app/shared/Service/width-sidebar.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit,DoCheck {
   visibleSidebar1;
  constructor(private Side:WidthSidebarService) { }
  ngDoCheck(): void {

  }
  ngOnInit(): void {

  }

}
