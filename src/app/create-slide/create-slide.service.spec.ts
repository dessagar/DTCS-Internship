import { TestBed } from '@angular/core/testing';

import { CreateSlideService } from './create-slide.service';

describe('CreateSlideService', () => {
  let service: CreateSlideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
