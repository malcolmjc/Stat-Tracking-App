import { DateToStringPipe } from './date-to-string.pipe';

describe('DateToStringPipe', () => {
  const pipe = new DateToStringPipe();

  test('should convert dates to string', () => {
    const date = new Date(2019, 1, 23, 4, 24);
    const transform = pipe.transform(date);
    const dateSplit = transform.split(' ');
    expect(dateSplit[0]).toEqual('February');
    expect(dateSplit[1]).toEqual('23,');
    expect(dateSplit[2]).toEqual('2019');
    expect(dateSplit[3]).toEqual('4:24');
  });

  test('should convert single digit minutes to double digit', () => {
    let date = new Date(2014, 10, 12, 8, 9);
    let transform = pipe.transform(date);
    let dateSplit = transform.split(' ');
    expect(dateSplit[0]).toEqual('November');
    expect(dateSplit[1]).toEqual('12,');
    expect(dateSplit[2]).toEqual('2014');
    expect(dateSplit[3]).toEqual('8:09');

    date = new Date(1998, 3, 3, 14, 0);
    transform = pipe.transform(date);
    dateSplit = transform.split(' ');
    expect(dateSplit[0]).toEqual('April');
    expect(dateSplit[1]).toEqual('3,');
    expect(dateSplit[2]).toEqual('1998');
    expect(dateSplit[3]).toEqual('14:00');
  });
});
