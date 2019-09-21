import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { GroupService } from 'src/app/groups/group.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-leaderboard',
  templateUrl: './user-leaderboard.component.html',
  styleUrls: ['./user-leaderboard.component.scss']
})
export class UserLeaderboardComponent implements OnInit {
  public ascending = false;
  public currentSortMethod = 'wins';
  public users: User[] = [];
  public inGroupUsersStats: User[] = [];
  public allTimeUsersStats: User[] = [];
  public isInGroup = false;

  constructor(public userService: UserService,
              private groupService: GroupService,
              public toastr: ToastrService) { }

  public ngOnInit() {
    if (this.groupService.getCurrentGroup()) {
      this.isInGroup = true;
      this.userService.getUserStatsInGroup().subscribe((users) => {
        this.inGroupUsersStats = users;
        this.users = users;
        this.onSelection(null);
      }, (error: HttpErrorResponse) => {
        this.handleError(error);
      });
    }
    this.userService.getUserStatsAllTime().subscribe((users) => {
      this.allTimeUsersStats = users;
      if (!this.isInGroup) {
        this.users = users;
        this.onSelection(null);
      }
    }, (error: HttpErrorResponse) => {
      this.handleError(error);
    });
  }

  public setAllTime() {
    this.users = this.allTimeUsersStats;
  }

  public setWithinGroup() {
    this.users = this.inGroupUsersStats;
  }

  public setDescending() {
    this.ascending = false;
    this.onSelection(null);
  }

  public setAscending() {
    this.ascending = true;
    this.onSelection(null);
  }

  public onSelection(evt) {
    if (evt && evt.any) {
      this.currentSortMethod = evt.value;
    }
    switch (this.currentSortMethod) {
      case 'wins': {
        this.users.sort((a, b) => {
          return !this.ascending ? b.stats.gamesWon - a.stats.gamesWon : a.stats.gamesWon - b.stats.gamesWon;
        });
        break;
      }
      case 'losses': {
        this.users.sort((a, b) => {
          return !this.ascending ? b.stats.gamesLost - a.stats.gamesLost : a.stats.gamesLost - b.stats.gamesLost;
        });
        break;
      }
      case 'W/L': {
        this.users.sort((a, b) => {
          const aWL = a.stats.gamesWon / (a.stats.gamesWon + a.stats.gamesLost);
          const bWL = b.stats.gamesWon / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bWL - aWL : aWL - bWL;
        });
        break;
      }
      case 'catches': {
        this.users.sort((a, b) => {
          const aRes = a.stats.catches / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.catches / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'points': {
        this.users.sort((a, b) => {
          const aRes = a.stats.points / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.points / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'drops': {
        this.users.sort((a, b) => {
          const aRes = a.stats.drops / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.drops / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'fifas': {
        this.users.sort((a, b) => {
          const aRes = a.stats.fifas / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.fifas / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'sinkers': {
        this.users.sort((a, b) => {
          const aRes = a.stats.sinkers / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.sinkers / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
    }

    this.users = [...this.users]; // necessary to trigger change detection
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.toastr.error('You are not a member of this group', 'Unauthorized!');
    } else if (error.status === 500) {
      this.toastr.error('Something went wrong', 'Unable to get all time stats');
    }
  }
}
