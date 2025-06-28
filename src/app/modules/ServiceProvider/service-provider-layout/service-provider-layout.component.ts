import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from "../Modules/shared.module";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-provider-layout',
  imports: [RouterOutlet, SharedModule, CommonModule],
  templateUrl: './service-provider-layout.component.html',
  styleUrl: './service-provider-layout.component.css'
})
export class ServiceProviderLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
