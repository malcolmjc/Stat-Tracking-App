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
    this.username = this.authService.getUserName();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.username = this.authService.getUserName();
      });
  }

  public onLogout() {
    this.authService.logout();
  }

  public ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
