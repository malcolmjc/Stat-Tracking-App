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
  transform(value: Date): string {
    const date = new Date(value);
    return `${monthNames[date.getMonth()]}
            ${date.getDate()}, ${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}`;
  }
}
