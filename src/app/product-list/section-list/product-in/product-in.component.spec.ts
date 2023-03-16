import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInComponent } from './product-in.component';

describe('ProductInComponent', () => {
  let component: ProductInComponent;
  let fixture: ComponentFixture<ProductInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
