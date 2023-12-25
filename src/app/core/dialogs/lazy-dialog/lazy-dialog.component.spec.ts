import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyDialogComponent } from './lazy-dialog.component';

describe('LazyDialogComponent', () => {
  let component: LazyDialogComponent;
  let fixture: ComponentFixture<LazyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
