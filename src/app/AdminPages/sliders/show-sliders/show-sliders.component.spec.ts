import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSlidersComponent } from './show-sliders.component';

describe('ShowSlidersComponent', () => {
  let component: ShowSlidersComponent;
  let fixture: ComponentFixture<ShowSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
