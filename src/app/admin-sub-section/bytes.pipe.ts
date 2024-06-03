import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {
  transform(bytes: number, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return 'N/A';
    if (typeof precision === 'undefined') precision = 2;

    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    return bytes.toFixed(+precision) + ' ' + units[unitIndex];
  }
}
