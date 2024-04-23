import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 5, suffix: string = "..."): string {
    /*if(limit >= value.length) return value;
    else return value.slice(0,limit) + "...";*/

    return limit >= value.length ? value : value.slice(0,limit) + suffix
  }

}
