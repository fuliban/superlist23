import { TestBed } from '@angular/core/testing';

import { ConfigUIService } from './config-ui.service';

describe('ConfigUIService', () => {
  let service: ConfigUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
