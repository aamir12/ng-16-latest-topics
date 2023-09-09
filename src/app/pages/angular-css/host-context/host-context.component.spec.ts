import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostContextComponent } from './host-context.component';

describe('HostContextComponent', () => {
  let component: HostContextComponent;
  let fixture: ComponentFixture<HostContextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostContextComponent]
    });
    fixture = TestBed.createComponent(HostContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
