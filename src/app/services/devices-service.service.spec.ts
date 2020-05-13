import { TestBed } from '@angular/core/testing';

import { DevicesServiceService } from './devices-service.service';

describe('DevicesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicesServiceService = TestBed.get(DevicesServiceService);
    expect(service).toBeTruthy();
  });
});
