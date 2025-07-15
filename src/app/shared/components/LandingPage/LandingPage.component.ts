import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../shared.module";
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { ToastrService } from 'ngx-toastr';
import { TopPackageCartComponent } from "../topPackageCart/topPackageCart.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-LandingPage',
  templateUrl: './LandingPage.component.html',
  styleUrls: ['./LandingPage.component.css'],
  imports: [SharedModule, TopPackageCartComponent,RouterLink]
})
export class LandingPageComponent implements OnInit {
  topPackages: any[] = [];
features = [
  {
    icon: '../../../assets/Frame 1157.png',
    title: 'Competitive Prices',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    icon: '../../../assets/Frame 1158.png',
    title: 'Secure Booking',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    icon: '../../../assets/Frame 1159.png',
    title: 'Seamless Experience',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  }
];

partnerLogos = [
  { name: 'Cozybnb', src: '../../../assets/Frame 1160.png' },
  { name: 'Serendipity',src: '../../../assets/Frame 1161.png' },
  { name: 'Hideaway', src: '../../../assets/Frame 1162.png' },
  { name: 'Earthly', src: '../../../assets/Frame 1163.png' },
  { name: 'The Nook', src: '../../../assets/Frame 1164.png' },
  { name: 'Homez', src: '../../../assets/Frame 1165.png' }
];
exploreCards = [
  { title: 'Azure Haven', image: '../../../assets/Rectangle 53.png' },
  { title: 'Serene Sanctuary', image: '../../../assets/Rectangle 54 (1).png' },
  { title: 'Verdant Vista', image: '../../../assets/Rectangle 54 (2).png' }
];

  constructor(private agencyService: AgencyService,private toastr: ToastrService,private  router: Router,) { }
 title = 'your-agency-landing-page';
  currentYear: number = new Date().getFullYear();
  ngOnInit() {
     this.agencyService.getTopPackages().subscribe(
      {
      next: (res: any) => {
      this.topPackages =res
      console.log(this.topPackages )
      },
      error: (err) => {
       this.toastr.error(err)
       
      }
    });
     ;
     console.log(this.topPackages)
  }
   viewPackages(id: number) {
      console.log(id)
  this.router.navigateByUrl(`/agancy/client/packageDetails/${id}`);
}
  viewAllPackages() {
  
  this.router.navigateByUrl(`/agancy/client/Packages`);
}
}
