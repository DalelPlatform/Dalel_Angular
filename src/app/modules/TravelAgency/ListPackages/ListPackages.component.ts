import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ListPackages',
  templateUrl: './ListPackages.component.html',
  styleUrls: ['./ListPackages.component.css'],
   standalone:false
})
export class ListPackagesComponent implements OnInit {
  agencyId: number | null = null;
    packages: any[] = [];
  constructor(private route: ActivatedRoute,private agencyService: AgencyService,
 private cookieService: CookieService,
private toastr: ToastrService,
private router: Router,
  ) { }

  ngOnInit() {
     this.agencyId = Number(this.route.snapshot.paramMap.get('Id'));

    this.loadPackages(this.agencyId)
  }
  loadPackages(agencyId: number) {
    this.agencyService.getMyPackages(agencyId).subscribe(
      {
         next: (res) => {
         this.packages = res;
        console.log('Packages:', this.packages);
      },
      error:((err) => {
     console.error('Failed to load packages:', err);
    })
      }
    )}
     
    deletePackage(id:number){
  
      const token = this.cookieService.get('Token');
        if (confirm('Are you sure you want to delete this agency?')) {

          this.agencyService.deletePackage(token,id).subscribe(
            {
         next: (res) => {
       this.packages = this.packages.filter(pkg => pkg.Id !== id);

          this.toastr.success(res.Message)
        
        
      },
      error:((err) => {
        if (err.status === 401) {
            this.toastr.error('Unauthorized access')

      
           this.router.navigate(['/login']);
          
          }
          else {
          this.toastr.error('Failed to delete package');
        }
    })
      }
          )
        }
}
   veiwSchadule(Id: number) {
      
  this.router.navigateByUrl(`/agancy/owner/ListPackage/Schadule/${Id}`);
}
}
