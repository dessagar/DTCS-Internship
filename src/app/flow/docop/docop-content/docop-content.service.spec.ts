import { TestBed } from '@angular/core/testing';

import { DocopContentService } from './docop-content.service';

describe('DocopContentService', () => {
  let service: DocopContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocopContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
