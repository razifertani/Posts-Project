import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../models/authData.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
