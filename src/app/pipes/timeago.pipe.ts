import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago'
})
export class TimeagoPipe implements PipeTransform {

  transform(date:Date | undefined): String {
    if (date==undefined) return '';
    return Math.round(((new Date().valueOf() - date.valueOf())/60000)).toString() + ' min';    
  }

}
