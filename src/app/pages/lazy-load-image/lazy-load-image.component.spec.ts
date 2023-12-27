import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadImageComponent } from './lazy-load-image.component';

describe('LazyLoadImageComponent', () => {
  let component: LazyLoadImageComponent;
  let fixture: ComponentFixture<LazyLoadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyLoadImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyLoadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
