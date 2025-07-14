import { Component, OnInit } from '@angular/core';
import { PropertyOwnerService } from '../../../../../../Services/Property/property-owner.service';
import { LoaderService } from '../../../../../../Services/loader.service';
import { IProperty } from '../../../../Models/IProperty';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.css'],
  standalone:false,
})
export class ListingsComponent implements OnInit {

  listings:IProperty[] = [];
  showDeleteModal = false;
  deleteId: number | null = null;

  constructor(private service:PropertyOwnerService ,
              public serviceloader : LoaderService,
              private router: Router,
              private toastr: ToastrService) {

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

  EditListing(id: number){
    this.router.navigate(['/property/add-listing', id]);
  }

  DeleteListing(id: number){
    this.showDeleteModal = true;
    this.deleteId = id;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteId = null;
  }

  confirmDelete() {
    if (this.deleteId !== null) {
      this.service.DeleteProperty(this.deleteId).subscribe({
        next: () => {
          this.toastr.success('Listing deleted successfully');
          this.getListings();
          this.closeDeleteModal();
        },
        error: (err) => {
          this.toastr.error('Failed to delete listing');
          console.log(err);
          this.closeDeleteModal();
        }
      });
    }
  }
}
