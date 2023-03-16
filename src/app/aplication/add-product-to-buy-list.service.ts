import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductToBuyListService {

  constructor(
    private productService:ProductService
  ) { }

  
  usecaseAddProductToBuyList(user:User,product: Product):Promise<boolean> {        
    return new Promise((resolve)=>{
      this.productService.getIdProductByCode(user,product.code).then((idProduct)=> {
        this.productService.updateProductAddedToList(user,idProduct).then(
          ()=>resolve(true)
        )
      })  
    })    
  }
}
