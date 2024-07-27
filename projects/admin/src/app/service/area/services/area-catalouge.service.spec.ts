import { TestBed } from '@angular/core/testing';

import { AreaCatalougeService } from './area-catalouge.service';

describe('AreaCatalougeService', () => {
  let service: AreaCatalougeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaCatalougeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
