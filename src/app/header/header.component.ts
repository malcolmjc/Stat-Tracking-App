import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  public userIsAuthenticated = false;
  public username = '';

  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.username = this.authService.getUserName();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  public onLogout() {
    this.authService.logout();
  }

  public ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
