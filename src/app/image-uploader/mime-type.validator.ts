import { AbstractControl } from '@angular/forms';

import { Observable, Observer, of } from 'rxjs';

const validHeaders = [
  '89504e47',
  'ffd8ffe0',
  'ffd8ffe1',
  'ffd8ffe2',
  'ffd8ffe3',
  'ffd8ffe8'
];
export const mimeType = (control: AbstractControl)
  : Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const fileReader$ = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      arr.forEach((int) => {
        header += int.toString(16);
      });

      if (validHeaders.includes(header)) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });

  return fileReader$;
};
