import { Component } from '@angular/core';
import { CheckboxControlValueAccessor, CheckboxRequiredValidator } from '@angular/forms';
import { AddProductToBuyListService } from 'src/app/aplication/add-product-to-buy-list.service';
import { ProductPurchasedService } from 'src/app/aplication/product-purchased.service';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-purchased-list',
  templateUrl: './purchased-list.component.html',
  styleUrls: ['./purchased-list.component.css']
})
export class PurchasedListComponent {
  purchasedProducts: Product[]=<Product[]>[];
  currentUser:User=<User>{};

  constructor(  
    private productService:ProductService,  
    private productPurchasedService:ProductPurchasedService,
    private addProductToBuyListService:AddProductToBuyListService,
    public translateService:TranslateService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {    
    this.authService.user$.subscribe(user=> {
      this.currentUser=user;
      
      this.productService.getPurchasedList(user).subscribe(data => {
        this.purchasedProducts = data;
  
        if (data && data.length!=0) {
          //remove products not recently purchased (30 minutes)
          data.forEach(prod=> {        
            if (prod.lastBuy) {                         
              var time = ((new Date()).valueOf() - prod.lastBuy.valueOf())/60000;
              
              if (time>30) {            
                this.productService.removeProductFromLists(prod,user);
              }
            }
          })
        }        
      });
      
    })
    
  }

  productsSortedByLastBuy(prod:Product[]) {
		return prod?.sort((a, b) =>{
      if (!a['lastBuy']) return 1;
      if (!b['lastBuy']) return -1;        
      return (a['lastBuy'] > b['lastBuy'] ? -1 : a['lastBuy'] === b['lastBuy'] ? 0 : 1)
    });
  } 
 
  isPurchased(oProd: Product): boolean {				
    if (!oProd) {
      return false;
    }
    else
    {
      if (oProd.status=='C') return true; else return false;
    }
  }

  onBuy(oProd:Product, e:Event){   
    if (e!==null && e.target!==null) {
      if ((e.target as HTMLInputElement).checked) {       
        this.productPurchasedService.usecaseProductPurchased(this.currentUser,oProd);			
      } else {
        this.addProductToBuyListService.usecaseAddProductToBuyList(this.currentUser,oProd);
      }   
    }    
  }
}
