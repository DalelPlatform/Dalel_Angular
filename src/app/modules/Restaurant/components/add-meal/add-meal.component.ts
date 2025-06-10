import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css',
  standalone: false
})
export class AddMealComponent {


  cookies = inject(CookieService);

  addMealForm: FormGroup;
  fb = inject(FormBuilder);
  _RestaurantService = inject(RestaurantService);

  sendForm: FormData = new FormData();
  constructor(private router : Router) {
    this.addMealForm = this.fb.group({
      Name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      Description: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(200)
      ]],
      Price: ['', [
        Validators.required,

      ]],
      DietaryTags: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)


      ]],
      FoodCategory: ['', [
        Validators.required,

      ]],
      PieceSize: ['', [

      ]],
      Duration: ['', [

      ]],





    })
  }


  get formControls() {
    return this.addMealForm.controls;
  }



  ChooseFile(event: any) {
    event.preventDefault();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.sendForm.append('RestaurantImage', files[i], files[i].name);
    }
    console.log('Files added to FormData:', files.length);

  }


  addMealFun(){
    console.log(this.addMealForm.value);
    // Show loader before request
   // Append form values to FormData
   const formValue = this.addMealForm.value;
   for (const key in formValue) {
     if (formValue.hasOwnProperty(key)) {
       this.sendForm.append(key, formValue[key]);
     }
    }

     this._RestaurantService.addMeal(this.sendForm).subscribe({

      next: () => {
        // Hide loader when response is received
        alert("Meal added successfully!")
        this.router.navigate(['/owner/restaurant-list']);
      },

      error: (err) => {

        console.error(err);
         // Hide loader on error
        alert("Failed to Add Restaurant")
      },
    })

  }





}






