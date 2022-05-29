import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageAPI } from 'src/app/shared/model/image-api';
import { ImageAPIService } from 'src/app/shared/Service/image-apiservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-images',
  templateUrl: './update-images.component.html',
  styleUrls: ['./update-images.component.css'],
})
export class UpdateImagesComponent implements OnInit {
  UpdateImage: FormGroup;
  Image: ImageAPI;
  id;
  massege = '';
  img;
  constructor(
    private activatedRoute: ActivatedRoute,
    private imageService: ImageAPIService,
    private _Location: Location
  ) {}

  ngOnInit(): void {
    this.UpdateImage = new FormGroup({
      path: new FormControl('', [Validators.required]),
    });
    //get id from url
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    //get image
    this.imageService.GetImage(this.id).subscribe(
      (Data) => {
        this.Image = Data;
        console.log(this.Image);
      },
      (ex) => {
        console.log(ex);
      }
    );
  }

  UpdateImages() {
    debugger;
    this.Values();
    if (this.UpdateImage.value) {
      const fd = new FormData();
      if (this.img != null) {
        fd.append('path', this.img);
      } else {
        fd.append('path', this.Image.path);
      }

      this.imageService.UpdateImage(this.id, fd).subscribe(
        (Data) => {
          this.massege = 'Update Image Is Successfull';
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      this.massege = 'Error Update Product';
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.img);
    } else {
      this.UpdateImage.value['imageProduct'] = null;
    }
  }

  GoBack() {
    this._Location.back();
  }

  Values() {
    if (this.UpdateImage.value['path'] == '') {
      this.UpdateImage.value['path'] = this.Image.path;
    }
  }
}
