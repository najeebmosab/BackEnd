import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrdersComponent } from './show-orders.component';

describe('ShowOrdersComponent', () => {
  let component: ShowOrdersComponent;
  let fixture: ComponentFixture<ShowOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
