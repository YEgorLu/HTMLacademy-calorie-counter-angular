import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacedNumber'
})
export class SpacedNumberPipe implements PipeTransform {

  transform(value: number | string): string {
    const threeNumbers: string[] = [];
    let cur: string[] = [];
    const kklStr = typeof value == 'number' ? Math.round(value).toString() : value;
    for (let i = 0; i < kklStr.length; i++) {
      cur.push(kklStr[kklStr.length - 1 - i]);
      if (cur.length === 3 || i === kklStr.length - 1){
        cur.reverse();
        threeNumbers.push(cur.join(''));
        cur = []
      }
    }
    threeNumbers.reverse();
    return threeNumbers.join(' ')
  }

}
