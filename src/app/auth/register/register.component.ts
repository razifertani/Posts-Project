import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../models/authData.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      const authData: AuthData = {
        email: form.value.email,
        password: form.value.password,
      };

      this.isLoading = true;
      this.authService.registerUser(authData);

    }
  }
}
