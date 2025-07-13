import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ListAgencies',
  templateUrl: './ListAgencies.component.html',
  styleUrls: ['./ListAgencies.component.css'],
   standalone:false
})
export class ListAgenciesComponent implements OnInit {
 agencies: any[] = [];
  constructor(  private router: Router, private agencyService: AgencyService, 
     private cookieService: CookieService,   private toastr: ToastrService,) { }

  ngOnInit() {
this.loadAgencies()
  }
  loadAgencies() {
    this.agencyService.getMyAgencies(this.cookieService.get('Token')).subscribe(
      {
         next: (res) => {
          this.toastr.success(res.Message)
        this.agencies = res.Data
        
        console.log("agencies",this.agencies)
      },
      error:((err) => {
        if (err.status === 401) {
            this.toastr.error('Unauthorized access')

      
        this.router.navigate(['/login']);}
    })
      }
    )}
    
    viewPackages(Id: number) {
      
  this.router.navigateByUrl(`/agancy/owner/ListPackage/${Id}`);
}
deleteAgecy(id:number){
  
      const token = this.cookieService.get('Token');
        if (confirm('Are you sure you want to delete this agency?')) {

          this.agencyService.deleteAgency(token,id).subscribe(
            {
         next: (res) => {
          this.agencies = this.agencies.filter(agency => agency.Id !== id)
          this.toastr.success(res.Message)
        
        
      },
      error:((err) => {
        if (err.status === 401) {
            this.toastr.error('Unauthorized access')

      
        this.router.navigate(['/login']);}
          else {
          this.toastr.error('Failed to delete agency');
        }
    })
      }
          )
        }
}
UpdateAgecy(Id:number){
  
  this.router.navigateByUrl(`/agancy/owner/updateAgency/${Id}`);
}
  }
