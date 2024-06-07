import { TestBed } from '@angular/core/testing';

import { FormDeactivateClassGuard } from './form-deactivate-class.guard';

describe('FormDeactivateClassGuard', () => {
  let guard: FormDeactivateClassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormDeactivateClassGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
