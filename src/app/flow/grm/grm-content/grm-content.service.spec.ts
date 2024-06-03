import { TestBed } from '@angular/core/testing';

import { GrmContentService } from './grm-content.service';

describe('GrmContentService', () => {
  let service: GrmContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrmContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
