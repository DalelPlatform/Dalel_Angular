import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loaderService.isLoading$ | async" class="loader-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
