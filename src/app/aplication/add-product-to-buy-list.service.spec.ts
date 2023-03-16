import { TestBed } from '@angular/core/testing';

import { AddProductToBuyListService } from './add-product-to-buy-list.service';

describe('AddProductToBuyListService', () => {
  let service: AddProductToBuyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductToBuyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
