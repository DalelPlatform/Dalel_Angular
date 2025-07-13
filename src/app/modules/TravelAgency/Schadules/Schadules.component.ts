import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';

@Component({
  selector: 'app-Schadules',
  templateUrl: './Schadules.component.html',
  styleUrls: ['./Schadules.component.css'],
  standalone:false
})
export class SchadulesComponent implements OnInit {
    Id: number | null = null;
    Schadule: any[] = [];
    BookingForSchadule: any[] = [];
   
    selectedSchadule: any = null;


  constructor(private route: ActivatedRoute,private agencyService: AgencyService,
 private cookieService: CookieService,
private toastr: ToastrService,
private router: Router,) { 

  
}

  ngOnInit() {
    this.Id = Number(this.route.snapshot.paramMap.get('Id'));
    
    this.loadSchadule(this.Id)
  }
 loadSchadule(Id: number) {
   const token = this.cookieService.get('Token');
    this.agencyService.PackageSchaduleByPackageId(token,Id).subscribe(
      {
         next: (res) => {
         this.Schadule = res.Data;
        console.log('Schadule:', this.Schadule);
      },
      error:((err) => {
     if (err.status === 401) {
            this.toastr.error('Unauthorized access')
            this.router.navigate(['/login']);
          }
    })
      }
    )}
selectSchadule(schadule: any) {
  this.selectedSchadule = schadule;
}
getBookingStatus(status: number): string {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Confirmed';
    case 2: return 'Rejected';
    case 3: return 'Cancel';
    case 4: return 'All';
    case 5: return 'PaymentConfirmed';
    default: return 'Unknown';
  
  }
}

}
