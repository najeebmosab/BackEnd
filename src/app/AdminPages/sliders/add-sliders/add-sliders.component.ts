import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { $ } from 'protractor';
import { SlidersServic } from 'src/app/shared/Service/sliders-servic.service';

@Component({
  selector: 'app-add-sliders',
  templateUrl: './add-sliders.component.html',
  styleUrls: ['./add-sliders.component.css'],
})
export class AddSlidersComponent implements OnInit {
  //virable for form
  AddSlider: FormGroup;
  image: any;
  massege;
  constructor(private slidersServic: SlidersServic) {}

  ngOnInit(): void {
    this.AddSlider = new FormGroup({
      heading: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      linke: new FormControl('', [Validators.required]),
      linkeName: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      status: new FormControl('', []),
    });
  }
  AddSliders() {
    debugger;
    if (this.AddSlider.valid) {
      console.log('Validation');
      const fd = new FormData();
      fd.append('heading', this.AddSlider.value['heading']);
      fd.append('description', this.AddSlider.value['description']);
      fd.append('linke', this.AddSlider.value['linke']);
      fd.append('linkeName', this.AddSlider.value['linkeName']);
      fd.append('image', this.image);
      if(this.AddSlider.value['status'] == "")
      {
        this.AddSlider.value['status'] = false;
      }
      fd.append('status', this.AddSlider.value['status']);

      this.slidersServic.AddSlider(fd).subscribe(
        (slider) => {
          this.massege = 'Add Slider Is Successful';
        },
        (ex) => {
          console.log(ex);
        }
      );
    } else {
      console.log('Not');
    }
  }

  HandelFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.image = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(this.image);
    } else {
      this.AddSlider.value['image'] = null;
    }
  }
}
