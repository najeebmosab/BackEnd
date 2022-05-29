import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './../../../shared/Service/category.service';
import { CategoryAPI } from './../../../shared/model/category-api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css'],
})
export class ShowCategoryComponent implements OnInit {
  //virable we use in this page
  massege = '';
  Categories: CategoryAPI[] = [];
  totalRecords = 0;
  page: number = 1;
  switchCategory: FormGroup;
  idCategory;
  constructor(private categoryService: CategoryService) {}
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  ngOnInit(): void {
    this.switchCategory = new FormGroup({
      newCategory: new FormControl('', [Validators.required]),
    });

    this.categoryService.GETCategoryies().subscribe(
      (Data: Array<CategoryAPI>) => {
        this.Categories = Data;
        this.totalRecords = Data.length;
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  DeleteCategory(par) {
    this.idCategory = par;
    if (confirm('Are You Sure To Delete This Category With All Products?')) {
      this.categoryService.DeleteCategory(par).subscribe(
        (Data) => {
          this.massege = 'Delete Category Is Sccessfull';
          this.ngOnInit();
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      if (
        confirm('Are You Sure To Delete This Category WithOut All Products?')
      ) {
        this.showDialog();
      }
    }
  }

  UpdateCategory() {
    if (this.switchCategory.valid) {
      this.categoryService.DELETECategoryWithoutProducts(this.idCategory,this.switchCategory.value['newCategory']).subscribe(
        Data=>{console.log(Data);this.ngOnInit();},
        ex=>{console.log(ex);}
      );
    }
  }
}
