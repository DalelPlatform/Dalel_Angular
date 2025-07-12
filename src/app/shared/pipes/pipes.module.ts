import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingsPipe } from './Ratings.pipe';
import { CustomDatePipe } from './date.pipe';



@NgModule({
  declarations: [	
      RatingsPipe,
      CustomDatePipe
   ],
  imports: [
    CommonModule
  ],
  exports: [
    RatingsPipe,
    CustomDatePipe
  ]
})
export class PipesModule { }
