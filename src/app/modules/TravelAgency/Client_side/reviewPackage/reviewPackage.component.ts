import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../../../../Services/TravelAgency/agency.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reviewPackage',
  templateUrl: './reviewPackage.component.html',
  styleUrls: ['./reviewPackage.component.css'],
  standalone: false
})
export class ReviewPackageComponent implements OnInit {
  bookingId!: number;
  reviewpackageForm!: FormGroup;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  hoverRating: number = 0;

  constructor(private route: ActivatedRoute, private agencyService: AgencyService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.bookingId = +this.route.snapshot.paramMap.get('bookingId')!;
    console.log('Booking ID:', this.bookingId);
    this.initForm();
  }

  initForm() {
    this.reviewpackageForm = this.fb.group({
      Rating: [null, Validators.required],
      Comment: ["", Validators.required]
    })
  }

  setRating(rating: number) {
    this.selectedRating = rating;
    this.reviewpackageForm.get('Rating')?.setValue(rating);
  }

  onSubmit() {
    if (!this.bookingId) {
      this.toastr.error("Booking ID not found");
      return;
    }

    const body = {
      Rating: this.reviewpackageForm.get('Rating')?.value,
      Comment: this.reviewpackageForm.get('Comment')?.value,
      bookingId: this.bookingId
    }

    console.log(body)
    const token = this.cookieService.get('Token');
    this.agencyService.addreviewPackage(body, token).subscribe({
      next: (res) => {
        console.log("this is res", res)
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
