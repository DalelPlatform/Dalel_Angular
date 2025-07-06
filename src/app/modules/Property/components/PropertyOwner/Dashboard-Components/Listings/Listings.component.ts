import { Component, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../../../../../Services/Property/property-owner.service';
import { LoaderService } from '../../../../../../Services/loader.service';
import { IProperty } from '../../../../../../core/models/Property/IProperty';

@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.css'],
  standalone:false,
})
export class ListingsComponent implements OnInit {

  listings:IProperty[] = [];

  constructor(private service:PropertyOwnerService , public serviceloader : LoaderService) {
    
   }

  ngOnInit() {
    this.getListings();
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
