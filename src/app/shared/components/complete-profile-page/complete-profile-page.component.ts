import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../modules/user/services/user.service';
import { IUserRegister } from '../../../modules/user/models/user.model';

@Component({
  selector: 'app-complete-profile-page',
  standalone: false,
  templateUrl: './complete-profile-page.component.html',
  styleUrls: ['./complete-profile-page.component.css']
})
export class CompleteProfilePageComponent implements OnInit {
  userData!: IUserRegister;
  role!: string;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUserProfile().subscribe(user => {
      this.userData = user;
      this.role = user.Role;
    });
  }

}
