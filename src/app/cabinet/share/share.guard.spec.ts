import { TestBed, async, inject } from '@angular/core/testing';

import { ShareGuard } from './share.guard';

describe('ShareGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareGuard]
    });
  });

  it('should ...', inject([ShareGuard], (guard: ShareGuard) => {
    expect(guard).toBeTruthy();
  }));
});
