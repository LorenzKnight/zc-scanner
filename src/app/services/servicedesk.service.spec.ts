import { TestBed } from '@angular/core/testing';

import { ServicedeskService } from './servicedesk.service';

describe('ServicedeskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicedeskService = TestBed.get(ServicedeskService);
    expect(service).toBeTruthy();
  });
});
