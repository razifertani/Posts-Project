import { Subscription } from 'rxjs';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubscription: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService.getAuthStatusListener().subscribe(
      value => {
        this.isAuthenticated = value;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }

}
