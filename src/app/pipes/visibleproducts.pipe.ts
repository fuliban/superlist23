import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'visibleproducts'
})
export class VisibleproductsPipe implements PipeTransform {  
  transform(products: Product[], stExpandedSection: string): Product[] {
    return products?.filter(product=>(product.status=='P' || product.section==stExpandedSection || stExpandedSection=='ALL') && product.status!='C')
  }
}
