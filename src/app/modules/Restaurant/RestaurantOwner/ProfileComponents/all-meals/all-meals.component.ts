import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../../Property/Models/IProperty';
import { IMeal } from '../../../interfaces/IMeal';
import { RestaurantService } from '../../../../../Services/Restaurant/restaurant.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../../Services/loader.service';
import { LoaderComponent } from "../../../../../component/loader/loader.component";

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.css'],
  standalone:false
})
export class AllMealsComponent implements OnInit {

  meals:IMeal[] = [];
  showDeleteModal = false;
  deleteId: number | null = null;

  constructor(private service:RestaurantService ,
              public serviceloader : LoaderService,
              private router: Router,
              private toastr: ToastrService) {

   }

  ngOnInit() {
    this.getMeals();
  }

  GoToAddMeal(){
    this.router.navigate(['/property/add-meal']);
  }

  getMeals(){

    this.service.GetMealsByRestaurantOwner().subscribe({
      next: (res) => {
        this.meals = res.Data;
        console.log(this.meals);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  EditMeal(id: number){
    this.router.navigate(['/restaurant/add-meal', id]);
  }

  DeleteMeal(id: number){
    this.showDeleteModal = true;
    this.deleteId = id;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteId = null;
  }

  confirmDelete() {
    if (this.deleteId !== null) {
      this.service.DeleteMeal(this.deleteId).subscribe({
        next: () => {
          this.toastr.success('Listing deleted successfully');
          this.getMeals();
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
