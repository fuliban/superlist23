import { Component,Input,Output,EventEmitter } from '@angular/core';

import { TranslateService } from 'src/app/services/translate.service';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-in',
  templateUrl: './product-in.component.html',
  styleUrls: ['./product-in.component.css']
})
export class ProductInComponent {
  @Input() product:Product=<Product>{};

  currentUser:User=<User>{};
  bExpanded:boolean=false;

  @Output() expandProductEvent = new EventEmitter<Product>();

  @Input()
	set expandedProduct(value:Product) {
		if (value!==null && value.desc!==this.product.desc) {
			//Another product is expanded			
			this.bExpanded=false;
    }		
    if (value!==null && value.desc===this.product.desc) {
			//This product is expanded (in case is reloaded)	
			this.bExpanded=true;
		}	
	}

  constructor(  
    private productService:ProductService,  
    public translateService: TranslateService,    
    public authService: AuthService
  ) {
    this.authService.user$.subscribe(user=>this.currentUser=user)
   }


  onChangeFavourite(oProduct:Product): void {
    if (oProduct) {
      var bMark: boolean;
      if (oProduct.favourite) {
        bMark=false;
      } else {
        bMark=true;        
      }
      oProduct.favourite=bMark;
      this.productService.updateFavourite(oProduct.code, bMark,this.currentUser)
    }		
  }

  onProductRemove(oProduct:Product) {
		if (oProduct) {
	    this.productService.removeProductFromLists(oProduct,this.currentUser);
	    this.expandedProduct=<Product>{};
		}
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


  increaseQuantity() {
    this.productService.increaseQuantity(this.product,this.currentUser) 
  }  

  decreaseQuantity() {
    this.productService.decreaseQuantity(this.product,this.currentUser) 
  }
   
  expandProductIcon(): string {
      if (this.expandedProduct) return 'expand_less'; else return 'expand_more';
  }

  favIcon(): string {
    if (this.product && this.product.favourite) return 'favorite'
    return '';
  }        

}
