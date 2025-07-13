import { Component, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../../../../../Services/Property/property-owner.service';
import { LoaderService } from '../../../../../../Services/loader.service';
import { IProperty } from '../../../../Models/IProperty';
import {Router} from '@angular/router';

@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.css'],
  standalone:false,
})
export class ListingsComponent implements OnInit {

  listings:IProperty[] = [];

  constructor(private service:PropertyOwnerService ,
              public serviceloader : LoaderService,
              private router: Router) {

   }

  ngOnInit() {
    this.getListings();
  }

  GoToListing(){
    this.router.navigate(['/property/add-listing']);
  }

  getListings(){

    this.service.getListings().subscribe({
      next: (res) => {
        this.listings = res.Data;
        console.log(this.listings);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
