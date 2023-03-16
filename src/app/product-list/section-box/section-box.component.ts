import { Component, Input } from '@angular/core';
import { Section } from 'src/app/models/section.model';
import { Product } from 'src/app/models/product.model';

import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-section-box',
  templateUrl: './section-box.component.html',
  styleUrls: ['./section-box.component.css']
})
export class SectionBoxComponent {
  @Input() section:Section=<Section>{};
  products:Product[]=<Product[]>[];

  constructor(
    private productService:ProductService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    if (this.section) {
      this.authService.user$.subscribe(user=>{
        this.productService.getUserSectionProducts(user,this.section).subscribe(prod=>this.products=prod)
      })    
    }
  }

  numberOfVisibleProducts():number {     
		return this.products?.filter(product=>product.status=='P').length;
  }   

	productsSortedByStatus(prod:Product[]) {
		return prod?.sort((a, b) => (a['status'] || '') > (b['status'] || '') ? -1 : a['status'] === b['status'] ? 0 : 1);
  }  
}
