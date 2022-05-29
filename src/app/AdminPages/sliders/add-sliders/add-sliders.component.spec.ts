import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlidersComponent } from './add-sliders.component';

describe('AddSlidersComponent', () => {
  let component: AddSlidersComponent;
  let fixture: ComponentFixture<AddSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
