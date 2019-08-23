import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { GroupService } from 'src/app/groups/group.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})

export class UserStatsComponent implements OnInit {
  public ascending = false;
  public isInGroup = false;
  public currentSortMethod = 'wins';
  public displayedColumns: string[] = [
    'win', 'loss', 'point', 'catch', 'drop', 'fifa', 'sinker'
  ];
  public selectedSort = '';
  public users: User[] = [];
  public allTimeUsersStats: User[];
  public inGroupUsersStats: User[];

  constructor(public userService: UserService,
              private groupService: GroupService,
              public toastr: ToastrService) { }

  public ngOnInit() {
    if (this.groupService.getCurrentGroup()) {
      this.isInGroup = true;
      this.userService.getUserStatsInGroup().subscribe((users) => {
        this.inGroupUsersStats = users;
        this.users = users;
        this.onSelection({
          value: this.currentSortMethod
        });
      }, (error: HttpErrorResponse) => {
        this.handleError(error);
      });
    }
    this.userService.getUserStatsAllTime().subscribe((users) => {
      this.allTimeUsersStats = users;
      if (!this.isInGroup) {
        this.users = users;
        this.onSelection({
          value: this.currentSortMethod
        });
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
    this.onSelection({
      value: this.currentSortMethod
    });
  }

  public setAscending() {
    this.ascending = true;
    this.onSelection({
      value: this.currentSortMethod
    });
  }

  public onSelection(evt) {
    this.currentSortMethod = evt.value;
    switch (evt.value) {
      case 'wins': {
        this.users = this.users.sort((a, b) => {
          return !this.ascending ? b.stats.gamesWon - a.stats.gamesWon : a.stats.gamesWon - b.stats.gamesWon;
        });
        break;
      }
      case 'losses': {
        this.users = this.users.sort((a, b) => {
          return !this.ascending ? b.stats.gamesLost - a.stats.gamesLost : a.stats.gamesLost - b.stats.gamesLost;
        });
        break;
      }
      case 'W/L': {
        this.users = this.users.sort((a, b) => {
          const aWL = a.stats.gamesWon / (a.stats.gamesWon + a.stats.gamesLost);
          const bWL = b.stats.gamesWon / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bWL - aWL : aWL - bWL;
        });
        break;
      }
      case 'catches': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.stats.catches / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.catches / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'points': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.stats.points / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.points / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'drops': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.stats.drops / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.drops / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'fifas': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.stats.fifas / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.fifas / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'sinkers': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.stats.sinkers / (a.stats.gamesLost + a.stats.gamesWon);
          const bRes = b.stats.sinkers / (b.stats.gamesLost + b.stats.gamesWon);
          return !this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.toastr.error('You are not a member of this group', 'Unauthorized!');
    } else if (error.status === 500) {
      this.toastr.error('Something went wrong', 'Unable to get all time stats');
    }
  }
}
