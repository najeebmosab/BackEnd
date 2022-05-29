import { CategoryAPI } from 'src/app/shared/model/category-api';
import { CategoryService } from './../../../shared/Service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  Categories: CategoryAPI;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.GETCategoryies().subscribe(
      Data=>{this.Categories = Data},
      ex=>{console.log(ex);}
    );
  }
}
