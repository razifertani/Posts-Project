import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../models/authData.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      const authData: AuthData = {
        email: form.value.email,
        password: form.value.password,
      };

      this.isLoading = true;
      this.authService.loginUser(authData);
    }
  }
}
