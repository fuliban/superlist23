import { TestBed } from '@angular/core/testing';

import { CreateSectionService } from './create-section.service';

describe('CreateSectionService', () => {
  let service: CreateSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
