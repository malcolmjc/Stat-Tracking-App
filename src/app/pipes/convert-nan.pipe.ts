import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'convertNaN'})
export class ConvertNaNPipe implements PipeTransform {
  transform(value: number): number {
    if (isNaN(value)) {
      return 0.0;
    }
    return value;
  }
}
