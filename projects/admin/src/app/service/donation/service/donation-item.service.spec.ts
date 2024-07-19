import { TestBed } from '@angular/core/testing';

import { DonationItemService } from './donation-item.service';

describe('DonationItemService', () => {
  let service: DonationItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
