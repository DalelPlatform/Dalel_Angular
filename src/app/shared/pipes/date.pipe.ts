import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
  standalone: false,
})
export class CustomDatePipe implements PipeTransform {
  private datePipe = new DatePipe('en-US');

  transform(value: Date | string | number, format: string = 'EEE dd MMM hh:mm a'): string | null {
    return this.datePipe.transform(value, format);
  }
} 