import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twolinesdesc'
})
export class TwolinesdescPipe implements PipeTransform {

  
  transform(value: unknown, stSDesc:string): string {
    var words = stSDesc.split(' ')
    var line1: string='';
    var line2: string='';
    var iLinea: number=1;
    var maxLen:number=10;
      
    for (let word of words) {		
      if (iLinea==1) {
        if (line1=='') {
          line1=word;
        }
        else {
          if (line1.length + word.length>maxLen) {
            iLinea=2;
          } 
          else {
            line1=line1 +' ' + word;
          }
        }
        
      }
      
      if (iLinea==2) {
        if (line2=='') {
          line2=word;
        }
        else {
          line2=line2 + ' ' + word;
        }
      }
          
    }
      return (line1 + ' ' + line2.slice(0,maxLen)).trim();
    }

}
