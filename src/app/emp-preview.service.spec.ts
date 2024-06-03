import { TestBed } from '@angular/core/testing';

import { EmpPreviewService } from './emp-preview.service';

describe('EmpPreviewService', () => {
  let service: EmpPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
