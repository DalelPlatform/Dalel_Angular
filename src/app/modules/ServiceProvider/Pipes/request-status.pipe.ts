import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusText'
})
export class StatusTextPipe implements PipeTransform {
  transform(value: number): string {
    const statusMap: { [key: number]: string } = {
      1: 'Pending',
      2: 'Accepted',
      3: 'Rejected',
      4: 'InProgress',
      5: 'Completed',
      6: 'Cancelled',
    };
    return statusMap[value] || 'Unknown';
  }
}