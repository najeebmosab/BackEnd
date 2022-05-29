import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNGCarouselComponent } from './prime-ngcarousel.component';

describe('PrimeNGCarouselComponent', () => {
  let component: PrimeNGCarouselComponent;
  let fixture: ComponentFixture<PrimeNGCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeNGCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeNGCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
