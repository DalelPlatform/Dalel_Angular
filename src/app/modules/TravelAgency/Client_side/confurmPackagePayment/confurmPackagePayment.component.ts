import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../../../Services/TravelAgency/agency.service';

@Component({
  selector: 'app-confurmPackagePayment',
  templateUrl: './confurmPackagePayment.component.html',
  styleUrls: ['./confurmPackagePayment.component.css'],
  standalone:false
})
export class ConfurmPackagePaymentComponent implements OnInit {
 bookingId: number | null = null;
     packages: any[] = [];
       packageForm!: FormGroup;
  constructor(private route: ActivatedRoute,private agencyService: AgencyService,
 private cookieService: CookieService,
private toastr: ToastrService,
private router: Router,   private fb: FormBuilder,) { }

  ngOnInit() {
           this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
           this.initForm()
  }
initForm(){
  this.packageForm = this.fb.group({

//  Amount : [null],
 AmountPaid : [null],
//  CommissionDeducted : [null],
 CodeApplied:"",
  PaymentMethod : [null],
//  PaymentStatus : [null],
  // Date:"",
 

  })
}
onSumbit(){
    if (!this.bookingId) {
    this.toastr.error("Booking ID not found");
    return;
  }
       const body = {
// Amount: this.packageForm.get('Amount')?.value,
AmountPaid: this.packageForm.get('AmountPaid')?.value,
// CommissionDeducted: this.packageForm.get('CommissionDeducted')?.value,
CodeApplied: this.packageForm.get('CodeApplied')?.value,
PaymentMethod: Number(this.packageForm.get('PaymentMethod')?.value),
// PaymentStatus: this.packageForm.get('PaymentStatus')?.value,
// Date: this.packageForm.get('Date')?.value,
bookingId :this.bookingId
       }
       console.log(body)
            const token = this.cookieService.get('Token');
          this.agencyService.packagePaymentconfurm(body,token).subscribe({
 
    next: (res) => {
      console.log("this is res",res)
   
          this.toastr.success(res.Message)
         this.router.navigate(['/agancy/client/Packages']);
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
          this.toastr.error('Failed ');
      }

      }
     
    })
}
}
