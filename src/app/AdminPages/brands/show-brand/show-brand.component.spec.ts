import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBrandComponent } from './show-brand.component';

describe('ShowBrandComponent', () => {
  let component: ShowBrandComponent;
  let fixture: ComponentFixture<ShowBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
