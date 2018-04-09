import { TestBed, async, inject } from '@angular/core/testing';
import {CabinetGuard} from './cabinet.guard';



describe('GuideGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinetGuard]
    });
  });

  it('should ...', inject([CabinetGuard], (guard: CabinetGuard) => {
    expect(guard).toBeTruthy();
  }));
});
