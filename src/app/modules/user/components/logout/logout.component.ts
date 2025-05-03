import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent {
  @Output() logoutEvent = new EventEmitter<void>();

  onLogout() {
    this.logoutEvent.emit();
  }
}