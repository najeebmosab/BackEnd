import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SlidersAPI } from 'src/app/shared/model/sliders';
import { HttpErrorResponse } from '@angular/common/http';
import { SlidersServic } from 'src/app/shared/Service/sliders-servic.service';

@Component({
  selector: 'app-update-sliders',
  templateUrl: './update-sliders.component.html',
  styleUrls: ['./update-sliders.component.css'],
})
export class UpdateSlidersComponent implements OnInit {
  UpdateSliders: FormGroup;
  massege = '';
  id;
  slider: SlidersAPI;
  image;
  constructor(
    private sliderService: SlidersServic,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.UpdateSliders = new FormGroup({
      heading: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      linke: new FormControl('', [Validators.required]),
      linkeName: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      status: new FormControl('', []),
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

     this.sliderService.GetSlider(this.id).subscribe(
       Data=>{this.slider = Data},
       ex=>{console.log(ex);}
     );
  }

  UpdateSlider() {
    debugger;
    this.Values();
    if (this.UpdateSliders.value != '') {
      console.log('Validation');
      const fd = new FormData();
      fd.append('heading', this.UpdateSliders.value['heading']);
      fd.append('description', this.UpdateSliders.value['description']);
      fd.append('linke', this.UpdateSliders.value['linke']);
      fd.append('linkeName', this.UpdateSliders.value['linkeName']);
      console.log(this.image);
      fd.append('image', this.image);
      if(this.UpdateSliders.value['status'] == "")
      {
        this.UpdateSliders.value['status'] = false;
      }
      fd.append('status', this.UpdateSliders.value['status']);

      this.sliderService.UpdateSlider(fd, this.id).subscribe(
        slider => {
          this.massege = 'Update Slider Is Successful';
        },
        ex => {
          console.log(ex);
        }
      );

    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
    } else {
    }
  }

  Values(){
    if (this.UpdateSliders.value['heading'] == '') {
      this.UpdateSliders.value['heading'] = this.slider.heading;
    }

    if (this.UpdateSliders.value['description'] == '') {
      this.UpdateSliders.value['description'] = this.slider.description;

    }

    if (this.UpdateSliders.value['linke'] == '') {
      this.UpdateSliders.value['linke'] = this.slider.linke;

    }

    if (this.UpdateSliders.value['linkeName'] == '') {
      this.UpdateSliders.value['linkeName'] = this.slider.linkeName;

    }

    if (this.UpdateSliders.value['image'] == '') {
      this.UpdateSliders.value['image'] = this.slider.image;

    }
  }
}
