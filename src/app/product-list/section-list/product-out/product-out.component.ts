import { Component, Input, Output,EventEmitter } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';

import { TranslateService } from 'src/app/services/translate.service';
import { AuthService } from 'src/app/services/auth.service';

import { ChangefavouritePipe } from 'src/app/pipes/changefavourite.pipe';
import { ProductService } from 'src/app/services/product.service';
import { AddProductToBuyListService } from 'src/app/aplication/add-product-to-buy-list.service';

@Component({
  selector: 'app-product-out',
  templateUrl: './product-out.component.html',
  styleUrls: ['./product-out.component.css']
})
export class ProductOutComponent {
  @Input() product:Product=<Product> {};

  constructor(
    private productService:ProductService,
    private addProductToBuyListService:AddProductToBuyListService,
    public translateService:TranslateService,
    private authService:AuthService
  ) {    
  }

  currentUser:User=<User>{};
  bExpanded:boolean=false;

  @Output() expandProductEvent = new EventEmitter<Product>();
  
  @Input()
	set expandedProduct(value:Product) {
		if (value!==null && value.desc!==this.product.desc) {
			//Another product is expanded			
			this.bExpanded=false;
		}		
  }
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user=>this.currentUser=user)
  }
  
  onProductClick(): void {		
		//Add to list
		this.addProductToBuyListService.usecaseAddProductToBuyList(this.currentUser,this.product);		
	}

  onExpandProduct() {    
		if (this.product) {
			if (this.bExpanded) {
        this.bExpanded=false;
        this.expandProductEvent.emit(<Product>{});                
			}
			else {
        this.bExpanded=true;
				this.expandProductEvent.emit(this.product);  
			}
		}
   } 

  expandProductIcon(): string {
		if (this.expandedProduct) return 'expand_less'; else return 'expand_more';
  }

  favIcon():string {
    if (this.product) {
      if (this.product.favourite) return 'favorite'
    }
    return 'favorite_border'
  }

  onChangeFavourite(): void {
    if (this.product) {
      var bMark: boolean;
      if (this.product.favourite) {
        bMark=false;
      } else {
        bMark=true;        
      }
      this.product.favourite=bMark;
      this.productService.updateFavourite(this.product.code, bMark,this.currentUser)
    }		
  }
  
  CSSisFav(): string {
    if (this.product) {
      if (this.product.favourite) return "isFav"       
    }
    return "notIsFav"
  }

  CSSisFavIcon(): string {
    if (this.product) {
      if (this.product.favourite) return "isFavIcon"      
    }
    return "notIsFavIcon"
  }
}

