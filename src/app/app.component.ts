import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { Router } from '@angular/router';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'Dalel';
  constructor(private router: Router , public serviceloader : LoaderService) {


  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogout() {
    this.router.navigate(['/logout']);
  }
  goToCompleteProfile() {
    this.router.navigate(['/complete-profile']);
  }
}
