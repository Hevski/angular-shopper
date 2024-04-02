import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPhone',
})
export class FormatPhonePipe implements PipeTransform {
  transform(phoneValue: string): string {
    if (!phoneValue) {
      return '';
    }

    const value = phoneValue.replace(/\D/g, '');
    const country = value.slice(0, 3);
    const city = value.slice(3, 6);
    const number = value.slice(6);

    return `(${country}) ${city}-${number}`;
  }
}
