import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticalComponent } from './create-artical.component';

describe('CreateArticalComponent', () => {
  let component: CreateArticalComponent;
  let fixture: ComponentFixture<CreateArticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateArticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateArticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
