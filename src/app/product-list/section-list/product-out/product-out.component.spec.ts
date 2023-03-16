import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutComponent } from './product-out.component';

describe('ProductOutComponent', () => {
  let component: ProductOutComponent;
  let fixture: ComponentFixture<ProductOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
