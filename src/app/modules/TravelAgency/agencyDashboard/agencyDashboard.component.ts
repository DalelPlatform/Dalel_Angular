import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencyDashboard',
  templateUrl: './agencyDashboard.component.html',
  styleUrls: ['./agencyDashboard.component.css'],
  standalone: false
})
export class AgencyDashboardComponent implements OnInit {
totalEarnings :number = 0;
 totalReviews: number = 0;
  averageRating: number = 0;
  constructor( 
      private cookieService: CookieService,
      private agencyService: AgencyService,
      private router: Router,
      private toastr: ToastrService,) { }

  ngOnInit() {
    this.loadEarning()
    this.loadReviews()

  }
loadEarning() {
   this.agencyService.getOwnerEarnings(this.cookieService.get('Token')).subscribe(
    {
      next: (res) => {
       this.totalEarnings=res
        console.log("Earnings", res);
        
      }
      , error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Unauthorized access');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Failed to load earnings');
        }
      } 


    })
}
loadReviews() {
   this.agencyService.getOwnerTotalReviews(this.cookieService.get('Token')).subscribe(
    {
      next: (res) => {
       this.totalReviews=res.TotalReviews
       this.averageRating=res.AverageRating
        console.log("reviews", res);
        
      }
      , error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Unauthorized access');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Failed to load reviews');
        }
      } 


    })
}
}
