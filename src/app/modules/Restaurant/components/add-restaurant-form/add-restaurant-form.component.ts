import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-restaurant-form',

  templateUrl: './add-restaurant-form.component.html',
  styleUrl: './add-restaurant-form.component.css',
  standalone: false
})
export class AddRestaurantFormComponent implements AfterViewInit {

  isLoading = false;

  cookies = inject(CookieService);

  addRestaurantForm: FormGroup;
  fb = inject(FormBuilder);
  RestaurantService = inject(RestaurantService);

  sendForm: FormData = new FormData();

  // Image upload state
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;

  // Map state
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map: any;
  marker: any;


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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 0);
  }

  initMap() {
    if (this.map) return;
    this.map = L.map('map').setView([24.099848519444283, 32.90224254124042], 17); // Default center (Aswan)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.addRestaurantForm.patchValue({
        Latitude: lat,
        Longitude: lng
      });
      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng, { draggable: true }).addTo(this.map);
        this.marker.on('dragend', (event: L.DragEndEvent) => {
          const position = (event.target as L.Marker).getLatLng();
          this.addRestaurantForm.patchValue({
            Latitude: position.lat,
            Longitude: position.lng
          });
        });
      }
    });
  }


  get formControls() {
    return this.addRestaurantForm.controls;
  }

  ChooseFile(event: any) {
    event.preventDefault();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.isValidImageFile(file)) {
        this.selectedFiles.push(file);
        this.createImagePreview(file);
      }
    }
    // Reset input so same file can be selected again
    event.target.value = '';
  }

  isValidImageFile(file: File): boolean {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return file && acceptedImageTypes.includes(file.type);
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrls.push(e.target.result);
      console.log('Preview URL:', e.target.result); // Add this line
    };
    reader.readAsDataURL(file);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
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
    // Append images
    this.selectedFiles.forEach((file, index) => {
      this.sendForm.append('RestaurantImage', file, file.name);
    });
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
