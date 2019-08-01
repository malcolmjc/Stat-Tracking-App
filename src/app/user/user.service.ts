import { Injectable } from '@angular/core';

import { TeamStats } from './team.stats.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class UserService {
  public map = new Map<string, {
    catches: number,
    sinkers: number,
    drops: number,
    points: number,
    fifas: number,
    opponents: string,
    won: boolean
  }[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findUsers(search: string) {
    // returns array of usernames
    return this.http.get<{ message: string, users: string[]}>
      ('http://localhost:3001/api/users/' + search).pipe(
        map((response) => response.users)
      );
  }

  public getUsers(): Observable<string[]> {
    if (!this.authService.getCurrentGroup()) {
      return of([this.authService.getUserName()]);
    }
    return this.http.get<{ message: string, users: string[]}>
      ('http://localhost:3001/api/user/usernames/'
        + this.authService.getUserId() + '/'
        + this.authService.getCurrentGroup()).pipe(
          map((response) => response.users)
        );
  }

  public getUserStatsAllTime(): Observable<User[]> {
    if (!this.authService.getCurrentGroup()) {
      // TODO
    }
    return this.http.get<{ message: string, users: User[]}>
      ('http://localhost:3001/api/user/allTimeStats/'
        + this.authService.getUserId()
        + '/' + this.authService.getCurrentGroup()).pipe(
          map((response) => response.users)
        );
  }

  public getUserStatsInGroup(): Observable<User[]> {
    if (!this.authService.getCurrentGroup()) {
      // TODO
    }
    return this.http.get<{ message: string, users: User[]}>
      ('http://localhost:3001/api/user/groupStats/'
        + this.authService.getUserId()
        + '/' + this.authService.getCurrentGroup()).pipe(
          map((response) => response.users)
        );
  }

  private getKey(nameOne: string, nameTwo: string): string {
    let firstAlpha = '';
    let secondAlpha = '';
    if (nameOne < nameTwo) {
      firstAlpha = nameOne;
      secondAlpha = nameTwo;
    } else {
      firstAlpha = nameTwo;
      secondAlpha = nameOne;
    }
    return firstAlpha + '-' + secondAlpha;
  }

  private checkPartnersHavePlayed(teamOne: string[], teamTwo: string[]) {
    const firstTeamMapKey = this.getKey(teamOne[0], teamOne[1]);
    const secondTeamMapKey = this.getKey(teamTwo[0], teamTwo[1]);
    const firstTeamResults = this.map.get(firstTeamMapKey);
    const secondTeamResults = this.map.get(secondTeamMapKey);
    if (firstTeamResults === undefined || firstTeamResults.length === 0) {
      throw new Error(teamOne[0] + ' & ' + teamOne[1] + ' have never played together!');
    } else if (secondTeamResults === undefined || secondTeamResults.length === 0) {
      throw new Error(teamTwo[0] + ' & ' + teamTwo[1] + ' have never played together!');
    }

    return [firstTeamResults, secondTeamResults];
  }

  private checkThatTeamsHavePlayedEachother(firstTeamResults, teamOne, teamTwo) {
    for (const gameResults of firstTeamResults) {
      if (gameResults.opponents === this.getKey(teamTwo[0], teamTwo[1])) {
        return;
      }
    }
    throw new Error(teamOne[0] + ' & ' + teamOne[1] + ' have never played ' +
                          teamTwo[0] + ' & ' + teamTwo[1]);
  }

  private checkMatchup(teamOne: string[], teamTwo: string[]) {
    const teamResults = this.checkPartnersHavePlayed(teamOne, teamTwo);
    this.checkThatTeamsHavePlayedEachother(teamResults[0], teamOne, teamTwo);
  }

  private getResults(teamOne: string[], teamTwo: string[]): [TeamStats, TeamStats] {
    const firstTeamMapKey = this.getKey(teamOne[0], teamOne[1]);
    const secondTeamMapKey = this.getKey(teamTwo[0], teamTwo[1]);
    const firstTeamResults = this.map.get(firstTeamMapKey);
    const firstTeamStats: TeamStats = {
      catches: 0,
      sinkers: 0,
      drops: 0,
      points: 0,
      fifas: 0,
      wins: 0,
      losses: 0
    };
    const secondTeamStats: TeamStats = {
      catches: 0,
      sinkers: 0,
      drops: 0,
      points: 0,
      fifas: 0,
      wins: 0,
      losses: 0
    };

    for (const playerGame of firstTeamResults) {
      // if this is the correct matchup, update stats
      if (playerGame.opponents === secondTeamMapKey) {
        firstTeamStats.catches += playerGame.catches;
        firstTeamStats.sinkers += playerGame.sinkers;
        firstTeamStats.drops += playerGame.drops;
        firstTeamStats.points += playerGame.points;
        firstTeamStats.fifas += playerGame.fifas;
        if (playerGame.won) {
          firstTeamStats.wins++;
        } else {
          firstTeamStats.losses++;
        }
      }
    }

    const secondTeamResults = this.map.get(secondTeamMapKey);
    for (const playerGame of secondTeamResults) {
      if (playerGame.opponents === firstTeamMapKey) {
        secondTeamStats.catches += playerGame.catches;
        secondTeamStats.sinkers += playerGame.sinkers;
        secondTeamStats.drops += playerGame.drops;
        secondTeamStats.points += playerGame.points;
        secondTeamStats.fifas += playerGame.fifas;
        if (playerGame.won) {
          secondTeamStats.wins++;
        } else {
          secondTeamStats.losses++;
        }
      }
    }

    return [firstTeamStats, secondTeamStats];
  }
}
