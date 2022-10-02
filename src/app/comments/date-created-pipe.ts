import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateCreated'
})
export class DateCreatedPipe implements PipeTransform {

    transform(value: any): unknown {
        let time = (Date.now() - Date.parse(value)) / 1000;
        const divider = [60, 60, 24];
        const string = ['second', 'minute', 'hour'];
        let i;
        for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
          time /= divider[i];
        }
          if(string[i]==undefined)
          {
          let newDate = new Date(value);
          return newDate.getFullYear() +"/" + newDate.getMonth() +"/"+ newDate.getDay();
          }
        const plural = Math.floor(time) > 1 ? 's' : '';
        return Math.floor(time) + string[i] + plural + ' ago';
      }


}


