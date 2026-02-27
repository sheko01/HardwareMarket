import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, isExpanded: boolean): string {
    if (!value) return '';
    // Return full
    if (isExpanded) return value;

    const words = value.split(' ');
    if (words.length <= 3) return value;
    // Return only the first 3 words
    return words.slice(0, 3).join(' ');
  }
}
