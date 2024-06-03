import { TestBed } from '@angular/core/testing';

import { BillingContentService } from './billing-content.service';

describe('BillingContentService', () => {
  let service: BillingContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
