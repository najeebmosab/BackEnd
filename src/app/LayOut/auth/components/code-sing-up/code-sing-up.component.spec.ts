import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSingUpComponent } from './code-sing-up.component';

describe('CodeSingUpComponent', () => {
  let component: CodeSingUpComponent;
  let fixture: ComponentFixture<CodeSingUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSingUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
