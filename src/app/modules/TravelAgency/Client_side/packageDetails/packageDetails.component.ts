import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../../../../Services/TravelAgency/agency.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-packageDetails',
  templateUrl: './packageDetails.component.html',
  styleUrls: ['./packageDetails.component.css'],
  standalone:false
})
export class PackageDetailsComponent implements OnInit {
 id: number | null = null;
    packages: any[] = [];
    Packagereviews: any[] = [];
    selectedScheduleId: number | null = null;
     packageForm!: FormGroup;
    selectedTab: string = 'overview';
  constructor(private route: ActivatedRoute,private agencyService: AgencyService,
 private cookieService: CookieService,
private toastr: ToastrService,
private router: Router,   private fb: FormBuilder,) { }

  ngOnInit() {
       this.id = Number(this.route.snapshot.paramMap.get('Id'));
    this.loadPackages(this.id)
    this.initForm();
    this.loadPackageReviews(this.id);
  }
  loadPackages(id: number) {
    this.agencyService.getpackageById(id).subscribe(
      {
         next: (res) => {
         this.packages.push(res);
        console.log('res:', this.packages);
      },
      error:((err) => {
     console.error('Failed to load packages:', err);
    })
      }
    )}

  loadPackageReviews(packageId: number) {
    this.agencyService.getPackageReveiw(packageId).subscribe({
      next: (res: any) => {
     this.Packagereviews.push(...res.Data || res);
        console.log('Package reviews:', this.Packagereviews);
      },
      error: (err) => {
        console.error(`Error loading reviews for package ${packageId}`, err);
      }
    });
  }

    selectTab(tab: string) {
  this.selectedTab = tab;
  console.log(tab)
}
booking(Id:number){
  console.log(this.cookieService.get('Token'))
 this.selectedScheduleId = Id;
}
initForm(){
  this.packageForm = this.fb.group({
 ReservedPeople : [null],
 Date:[""],

  })
}
onSumbit(){
  
     const body = {
    ReservedPeople: this.packageForm.get('ReservedPeople')?.value,
    Date: this.packageForm.get('Date')?.value,
    PackageSchaduleId: this.selectedScheduleId,
    ClientId :this.cookieService.get('Token')
  };
  console.log(body)
         const token = this.cookieService.get('Token');
          this.agencyService.bookPackage(body,token).subscribe({
 
    next: (res) => {
      console.log("this is res",res)
   
          this.toastr.success(res.Message)
             const bookingId = res.Data?.Id; 
         this.router.navigateByUrl(`/agancy/client/confurmPackagePayment/${bookingId}`);
        },
        error: (err) => {
          console.log(err)
          if (err.status === 400 && err.error?.errors) {
        
       this.toastr.error("Please fill all data")
      }
       else if (err.status === 401) {
            this.toastr.error('Unauthorized access')

      
        this.router.navigate(['/login']);
      } else {
        this.toastr.error(err.error
);
      }

      }
     
    })
}
}
