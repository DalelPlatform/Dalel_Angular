import { Component, Input, OnInit } from '@angular/core';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';

@Component({
  selector: 'app-GetpackagesReviews',
  templateUrl: './GetpackagesReviews.component.html',
  styleUrls: ['./GetpackagesReviews.component.css'],
  standalone: false
})
export class GetpackagesReviewsComponent implements OnInit {
 @Input() packageId!: number;
  reviews: any[] = [];

  constructor(private agencyService: AgencyService) {}

  ngOnInit(): void {
    this.loadReviews();
  }
  loadReviews() {
    this.agencyService.getPackageReveiw(this.packageId).subscribe({
      next: (res: any) => {
        this.reviews = res.Data || res;
      },
      error: (err) => {
        console.error(`Error loading reviews for package ${this.packageId}`, err);
        this.reviews = [];
      }
    });
  }
}
