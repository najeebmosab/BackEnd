import { CategoryService } from './../../../shared/Service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryAPI } from './../../../shared/model/category-api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  massege = '';
  Category: CategoryAPI;
  id;
  img;
  UpdateCategory: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.UpdateCategory = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required]),
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryService.GETSingleCategory(this.id).subscribe(
      (Data) => {
        this.Category = Data;
        console.log(this.Category);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  UpdateCategorys() {
    debugger
    this.Values();
    if (this.UpdateCategory.value) {
      const fd = new FormData();
      fd.append('categoryName', this.UpdateCategory.value['categoryName']);
      if (this.img != null) {
        fd.append('picture', this.img);
      } else {
        fd.append('picture', this.UpdateCategory.value['picture']);
      }
      this.categoryService.UpdateCategory(this.id,fd).subscribe(
        Data=>{
          console.log(Data);
          this.massege="Update Category Sccessfull";
          this.ngOnInit();
      },
        ex=>{console.log(ex);}
      );

    }
  }

  Values() {
    if (this.UpdateCategory.value['categoryName'] == "") {
      this.UpdateCategory.value['categoryName'] = this.Category.categoryName;
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.UpdateCategory.value['imageProduct'] = null;
    }
  }
}
