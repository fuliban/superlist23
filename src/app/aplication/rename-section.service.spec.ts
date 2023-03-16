import { TestBed } from '@angular/core/testing';

import { RenameSectionService } from './rename-section.service';

describe('RenameSectionService', () => {
  let service: RenameSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenameSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
