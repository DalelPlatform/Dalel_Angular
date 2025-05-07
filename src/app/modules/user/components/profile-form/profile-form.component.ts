import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  IUserRegister } from '../../models/user.model';
import { IServiceProvider, IDriver, IHomeChef } from '../../models/user-extended.model';

@Component({
  selector: 'app-profile-form',
  standalone: false,
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  @Input() role!: string;
  @Input() initialData!: IUserRegister;

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    const baseControls = {
      UserName: [this.initialData?.UserName || '', Validators.required],
      Email: [this.initialData?.Email || '', [Validators.required, Validators.email]],
      NationalId: [this.initialData?.NationalId || '', Validators.required],
      PhoneNumber: [this.initialData?.PhoneNumber || '', Validators.required],
    };

    let roleControls: any = {};
    switch (this.role) {
      case 'ServiceProvider':
        roleControls = {
          WorkType: ['', Validators.required],
          LicenseNumber: [''],
          Image: [''],
          Skills: [[]],
          StartProffessionDate: [''],
          Address: [''],
          City: [''],
          About: [''],
          License: [''],
          Certificate: [''],
          CategoryServiceId: [0],
          AverageRate: [0],
        };
        break;

      case 'Driver':
        roleControls = {
          LicenseNumber: [''],
          Avaliablitiy: ['']
        };
        break;

      case 'HomeChef':
        roleControls = {
          FoodSafetyCertificate: [''],
          BankDetails: [''],
          WorkingHours: [''],
          IsDeleted: [false]
        };
        break;

      // Add other roles here similarly
    }

    this.profileForm = this.fb.group({
      ...baseControls,
      ...roleControls
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // emit or call service to save
    }
  }
}
