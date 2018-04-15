import { TestBed, inject } from '@angular/core/testing';

import { CurrentDashboardService } from './current-dashboard.service';

describe('CurrentDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentDashboardService]
    });
  });

  it('should be created', inject([CurrentDashboardService], (service: CurrentDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
