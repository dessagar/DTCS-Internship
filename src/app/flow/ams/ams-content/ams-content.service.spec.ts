import { TestBed } from '@angular/core/testing';

import { AmsContentService } from './ams-content.service';

describe('AmsContentService', () => {
  let service: AmsContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmsContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
