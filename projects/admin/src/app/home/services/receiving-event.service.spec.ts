import { TestBed } from '@angular/core/testing';

import { ReceivingEventService } from './receiving-event.service';

describe('ReceivingEventService', () => {
  let service: ReceivingEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivingEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
