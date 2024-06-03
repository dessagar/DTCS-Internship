import { TestBed } from '@angular/core/testing';

import { NewslideserviceService } from './newslideservice.service';

describe('NewslideserviceService', () => {
  let service: NewslideserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewslideserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
