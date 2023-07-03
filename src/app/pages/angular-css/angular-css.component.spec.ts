import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCssComponent } from './angular-css.component';

describe('AngularCssComponent', () => {
  let component: AngularCssComponent;
  let fixture: ComponentFixture<AngularCssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularCssComponent]
    });
    fixture = TestBed.createComponent(AngularCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
