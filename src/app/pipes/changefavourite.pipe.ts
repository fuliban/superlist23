import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changefavourite'
})
export class ChangefavouritePipe implements PipeTransform {

  transform(value: unknown, favourite:boolean | undefined): string {
    if (favourite) return 'favorite'; else return 'favorite_border';
  }

}
