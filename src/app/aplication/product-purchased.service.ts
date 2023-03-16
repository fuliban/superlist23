import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { HistoricalService } from '../services/historical.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPurchasedService {

  constructor(
    private productService:ProductService,
    private historicalService:HistoricalService
  ) { }

  usecaseProductPurchased(user:User,product: Product) {
    this.productService.getIdProductByCode(user,product.code).then((idProduct)=> {

      const PromiseProduct=this.productService.updateProductPurchased(user,idProduct);
      const PromiseHistorical=this.historicalService.createHistorical(product,user,new Date); 

      return new Promise((resolve)=>{
        Promise.all([PromiseProduct,PromiseHistorical]).then(
            function  (values) {
            if (values[0]==true && values[1]!='') {                            
                resolve(true);
            }
        }    
        );
    }) 
    })
  }  
}
