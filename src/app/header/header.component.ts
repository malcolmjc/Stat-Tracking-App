import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GroupService } from '../groups/group.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {
  public userIsAuthenticated = false;
  public username = '';
  public groupName = '';

  private authListenerSub: Subscription;
  private groupNameListenerSub: Subscription;

  constructor(private authService: AuthService,
              private groupService: GroupService,
              private userService: UserService) { }

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

    this.userService.getNotificationsForUser(this.authService.getUserName())
      .subscribe((notifications) => {
        if (notifications.length > 0) {
          document.getElementById('profile-link').classList.add('flicker');
        }
    });
  }

  public onLogout() {
    this.authService.logout();
  }

  public profileClicked() {
    document.getElementById('profile-link').classList.remove('flicker');
  }

  public ngOnDestroy() {
    this.authListenerSub.unsubscribe();
    this.groupNameListenerSub.unsubscribe();
  }
}
