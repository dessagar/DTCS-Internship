import { TestBed } from '@angular/core/testing';

import { CareContentService } from './care-content.service';

describe('CareContentService', () => {
  let service: CareContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
