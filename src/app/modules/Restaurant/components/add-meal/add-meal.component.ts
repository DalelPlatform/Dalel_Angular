import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { Router } from '@angular/router';
import { IMeal } from '../../interfaces/IMeal';

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
        Validators.maxLength(20000)
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
      RestaurantMenuItemImages: [[]],





    })
  }


  get formControls() {
    return this.addMealForm.controls;
  }



  ChooseFile(event: any) {
    event.preventDefault();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.sendForm.append('RestaurantMenuItemImages', files[i], files[i].name);
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


  importMealsFromJson(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    try {
      const meals: IMeal[] = JSON.parse(e.target.result);

      meals.forEach(meal => {
        const formData = new FormData();

        // Append meal fields to formData
        formData.append("Name", meal.Name);
        formData.append("Description", meal.Description);
        formData.append("Price", meal.Price.toString());
        formData.append("AvailabilityStatus", meal.AvailabilityStatus.toString());
        formData.append("FoodCategory", meal.FoodCategory.toString());
        formData.append("PieceSize", meal.PieceSize.toString());
        formData.append("Duration", meal.Duration.toString());
        formData.append("Discount", meal.Discount.toString());
        formData.append("DietaryTags", meal.DietaryTags);
        formData.append("RestaurantName", meal.RestaurantName);

        // Upload images (assumes you have the image file in assets or handle it by name)
        meal.Images.forEach((image, index) => {
          const imageFile = new File([""], image); // placeholder: replace with real File if you have
          formData.append(`Images`, imageFile, image);
        });

        // Send each meal to backend
        this._RestaurantService.addMeal(formData).subscribe({
          next: () => console.log(`Meal "${meal.Name}" uploaded.`),
          error: err => console.error(`Error uploading "${meal.Name}"`, err)
        });
      });

      alert("All meals uploaded!");
    } catch (error) {
      console.error("Invalid JSON file", error);
      alert("Failed to parse the file. Please upload a valid JSON.");
    }
  };

  reader.readAsText(file);
}





}






