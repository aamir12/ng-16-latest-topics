import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
  standalone: true
})
export class FilterArrayPipe implements PipeTransform {

  transform(items: any[], property: string, filterValue: any): any[] {
    if (!items) return [];
    
    if(!filterValue) {
      return items.slice();
    }
    return items.filter(item => item[property] === filterValue);
  }

}
