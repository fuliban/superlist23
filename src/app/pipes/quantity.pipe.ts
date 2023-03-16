import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  transform(quantity:number | undefined): unknown {
    if (quantity==null) return 1;
    if (quantity>1) return quantity; else return 1;
  }

}
