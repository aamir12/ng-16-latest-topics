import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkUsersComponent } from './ak-users.component';

describe('AkUsersComponent', () => {
  let component: AkUsersComponent;
  let fixture: ComponentFixture<AkUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AkUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AkUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
