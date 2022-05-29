import { CategoryService } from 'src/app/shared/Service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  massege = '';
  AddCategory: FormGroup;
  img;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.AddCategory = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required]),
    });
  }

  AddCategorys() {
    debugger;
    if (this.AddCategory.valid) {
      const fd = new FormData();
      fd.append('categoryName',this.AddCategory.value['categoryName']);
      fd.append('picture',this.img);

      this.categoryService.AddCategory(fd).subscribe(
        Data=>{console.log(Data);
        this.massege = "Add Category Is Sccessfull"},
        ex=>{console.log(ex);},
      );
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.AddCategory.value['picture'] = null;
    }
  }
}
