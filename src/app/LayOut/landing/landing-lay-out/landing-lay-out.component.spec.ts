import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLayOutComponent } from './landing-lay-out.component';

describe('LandingLayOutComponent', () => {
  let component: LandingLayOutComponent;
  let fixture: ComponentFixture<LandingLayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingLayOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
