import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-restaurant-form',

  templateUrl: './add-restaurant-form.component.html',
  styleUrl: './add-restaurant-form.component.css',
  standalone: false
})
export class AddRestaurantFormComponent {

  isLoading = false;

  cookies = inject(CookieService);

  addRestaurantForm: FormGroup;
  fb = inject(FormBuilder);
  RestaurantService = inject(RestaurantService);

  sendForm: FormData = new FormData();



  constructor(private router : Router) {
    this.addRestaurantForm = this.fb.group({
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
      NumberOfRooms: ['', [
        Validators.required,

      ]],
      BuildingNo: ['', [
        Validators.required,


      ]],
      Address: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)
      ]],
      City: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      Region: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      Street: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)

      ]],
      Latitude: ['', [
        Validators.required,

      ]],
      Longitude: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]],
      PhoneNumber: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)
      ]],





    })
  }


  get formControls() {
    return this.addRestaurantForm.controls;
  }

  ChooseFile(event: any) {
    event.preventDefault();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.sendForm.append('RestaurantImage', files[i], files[i].name);
    }
    console.log('Files added to FormData:', files.length);

  }
  addRestaurantFormFun() {
    // console.log("this is form data : " ,this.addRestaurantForm);
    console.log(this.addRestaurantForm.value);
     // Show loader before request
    // Append form values to FormData
    const formValue = this.addRestaurantForm.value;
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        this.sendForm.append(key, formValue[key]);
      }
    }
    // console.log(this.addRestaurantForm);
    // console.log(this.addRestaurantForm.controls);



    this.RestaurantService.addRestaurant(this.sendForm).subscribe({

      next: () => {
        // Hide loader when response is received
        alert("Restaurant added successfully!")
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
