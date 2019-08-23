import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GroupService } from '../groups/group.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  public userIsAuthenticated = false;
  public username = '';
  public groupName = '';

  private authListenerSub: Subscription;
  private groupNameListenerSub: Subscription;

  constructor(private authService: AuthService, private groupService: GroupService) { }

  public ngOnInit() {
    this.username = this.authService.getUserName();
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.username = this.authService.getUserName();
      });

    this.groupNameListenerSub = this.groupService.getCurrentGroupListener()
      .subscribe((groupName) => {
        this.groupName = groupName;
      });
    this.groupService.getCurrentGroupName();
  }

  public onLogout() {
    this.authService.logout();
  }

  public ngOnDestroy() {
    this.authListenerSub.unsubscribe();
    this.groupNameListenerSub.unsubscribe();
  }
}
