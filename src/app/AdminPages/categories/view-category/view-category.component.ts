import { CategoryService } from 'src/app/shared/Service/category.service';
import { CategoryAPI } from './../../../shared/model/category-api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  category: CategoryAPI;
  id;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryService.GETSingleCategory(this.id).subscribe(
      (Data) => {
        this.category = Data;
      },
      (ex) => {
        console.log(ex);
      }
    );
  }
}
