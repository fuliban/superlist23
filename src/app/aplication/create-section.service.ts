import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Section } from '../models/section.model';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CreateSectionService {

  constructor(
    private productService:ProductService
  ) { }


  async usecaseCreateSection(user:User, section: Section):Promise<boolean> {   
    console.log(`ucs ${section.name}`)  
    let newSection=await this.productService.userSectionByNamePromise(user,section.name);
    console.log(`ucs ${newSection}`)  

    return new Promise((resolve,reject) => {      
      if (newSection==null ) {
        this.productService.createSection(user,section)
      }
      else {
        reject('Section exists!!');
      }
    }
    )      
  }  
}
