import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Section } from '../models/section.model';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class RenameSectionService {

  constructor(
    private productService:ProductService
  ) { }

  

async usecaseRenameSection(user:User,originalName:string, section: Section):Promise<boolean> { 
  console.log(section.name)
  let newSection=await this.productService.userSectionByNamePromise(user,section.name);
  console.log(newSection)
  return new Promise((resolve,reject) => {
        
      if (newSection==null ) {
        this.productService.getIdSectionByName(user,originalName).then((id)=>{
          console.log(`urs id ${id}`);
          if (id=='') {
            reject ('Section not exists');
          }
          else  {
            this.productService.updateSectionById(user,section,id)            
          }
        })
      }
      else {
        reject('Section exists!!');
      }

    }
    )      
  }
}
