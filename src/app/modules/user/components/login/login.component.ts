import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  @Output() loginEvent = new EventEmitter<{ userName: string; password: string }>();

  onLogin() {
    this.loginEvent.emit({ userName: this.userName, password: this.password });
  }
}
