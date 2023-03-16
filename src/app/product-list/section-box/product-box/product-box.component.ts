import { Component,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from 'src/app/services/translate.service';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductPurchasedService } from 'src/app/aplication/product-purchased.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() product: Product=<Product>{};

  currentUser:User=<User>{};

  constructor(
    private productPurchasedService: ProductPurchasedService,
    private authService:AuthService,
    public translateService:TranslateService
  ) {      
   }

  ngOnInit(): void {
    this.authService.user$.subscribe(user=>this.currentUser=user)
  }

	imgProduct(prod: Product): string {
		if (!prod.urlImg || prod.urlImg=='') 
			return '';
		else
			return prod.urlImg;		
  }
  
  onProductClick(oProd:Product){         
    this.productPurchasedService.usecaseProductPurchased(this.currentUser,oProd);  
  }  
}
