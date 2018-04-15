import { TestBed, async, inject } from '@angular/core/testing';
import {CurrentDashboardGuard} from './current-dashboard.guard';

describe('CurrentDashboardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentDashboardGuard]
    });
  });

  it('should ...', inject([CurrentDashboardGuard], (guard: CurrentDashboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
