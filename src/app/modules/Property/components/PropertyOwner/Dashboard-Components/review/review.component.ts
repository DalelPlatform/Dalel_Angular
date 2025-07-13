import {Component, OnInit} from '@angular/core';
import {IPropertyReview} from '../../../../Models/iproperty-review';
import {PropertyOwnerService} from '../../../../../../Services/Property/property-owner.service';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{

  reviews:IPropertyReview[] = [];

  constructor(private service:PropertyOwnerService ) { }

  ngOnInit() {
    this.GetReviews();
  }

  GetReviews(){
    this.service.getAllReviews().subscribe({
      next: (res) => {
        this.reviews = res.Data;
        console.log(res);
        console.log(this.reviews);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
