import { TestBed } from '@angular/core/testing';

import { LsmContentService } from './lsm-content.service';

describe('LsmContentService', () => {
  let service: LsmContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LsmContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
