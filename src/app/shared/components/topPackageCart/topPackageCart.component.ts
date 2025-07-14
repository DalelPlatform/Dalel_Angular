import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topPackageCart',
  templateUrl: './topPackageCart.component.html',
  styleUrls: ['./topPackageCart.component.css']
})
export class TopPackageCartComponent implements OnInit {
@Input() package: any;
  constructor(private  router: Router,) { }

  ngOnInit() {
  }
  viewPackages(id: number) {
      console.log(id)
  this.router.navigateByUrl(`/agancy/client/packageDetails/${id}`);
}
  viewAllPackages() {
  
  this.router.navigateByUrl(`/agancy/client/Packages`);
}
}
