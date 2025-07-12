import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Ratings',
  standalone: false,
})
export class RatingsPipe implements PipeTransform {

  transform(rating: number, max: number = 5): number[] {
    return Array(max).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

}
