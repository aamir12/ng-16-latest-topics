import { TestBed } from '@angular/core/testing';

import { AkUsersService } from './ak-users.service';

describe('AkUsersService', () => {
  let service: AkUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AkUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
