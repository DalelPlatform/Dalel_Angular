import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user: User = {
    userName: '',
    email: '',
    nationalId: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  @Output() registerEvent = new EventEmitter<User>();

  onRegister() {
    this.registerEvent.emit(this.user);
  }
}