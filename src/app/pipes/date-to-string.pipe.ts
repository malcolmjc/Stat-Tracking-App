import { Pipe, PipeTransform } from '@angular/core';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
@Pipe({name: 'dateToString'})
export class DateToStringPipe implements PipeTransform {
  public transform(value: Date): string {
    const date = new Date(value);
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ` +
           `${date.getHours()}:${this.doubleDigit(date.getMinutes())}`;
  }

  private doubleDigit(num: number) {
    if (num <= 9) {
      return '0' + num;
    }
    return '' + num;
  }
}
