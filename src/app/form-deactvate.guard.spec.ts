import { TestBed } from '@angular/core/testing';

import { FormDeactvateGuard } from './form-deactvate.guard';

describe('FormDeactvateGuard', () => {
  let guard: FormDeactvateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormDeactvateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
