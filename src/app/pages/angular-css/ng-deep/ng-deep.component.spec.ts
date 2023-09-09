import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDeepComponent } from './ng-deep.component';

describe('NgDeepComponent', () => {
  let component: NgDeepComponent;
  let fixture: ComponentFixture<NgDeepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgDeepComponent]
    });
    fixture = TestBed.createComponent(NgDeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
