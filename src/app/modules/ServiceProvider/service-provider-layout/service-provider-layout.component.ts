import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedModule } from "../../../shared/shared.module";


@Component({
  selector: 'app-service-provider-layout',
  imports: [RouterOutlet, CommonModule, SharedModule],
  templateUrl: './service-provider-layout.component.html',
  styleUrl: './service-provider-layout.component.css'
})
export class ServiceProviderLayoutComponent implements OnInit {
  ServiceProviderLinks = [
    { label: 'Add Project', icon: 'fa-solid fa-diagram-project', route: 'AddProject' },
    { label: 'Your Account', icon: 'fas fa-user', route: 'ServiceProvider' },
    { label: 'Projects List', icon: 'fa-solid fa-check-double', route: 'ProjectsList' },
    { label: 'Proposals List', icon: 'fa-solid fa-list-ul', route: 'ProposalList' },
    { label: 'All Requests', icon: 'fa-solid fa-bullhorn', route: 'AllRequests' },
    { label: 'Reviews List', icon: 'fas fa-search', route: 'ProviderReview' },
    // { label: 'Sign Out', icon: 'fas fa-sign-out-alt', route: 'logout' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
