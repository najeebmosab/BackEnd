import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSlidersComponent } from './update-sliders.component';

describe('UpdateSlidersComponent', () => {
  let component: UpdateSlidersComponent;
  let fixture: ComponentFixture<UpdateSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
