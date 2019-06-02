import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { GameService } from 'src/app/game/game.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Game } from 'src/app/game/game.model';
import { PlayerSelectionFormFieldComponent } from '../player-selection-form-field/player-selection-form-field.component';
import { PredictorStatsComponent } from '../predictor-stats/predictor-stats.component';
import { Router } from '@angular/router';
import { TeamStats } from '../team.stats.model';

@Component({
  selector: 'app-matchup-predictor',
  templateUrl: './matchup-predictor.component.html',
  styleUrls: ['./matchup-predictor.component.css']
})
export class MatchupPredictorComponent implements OnInit {
  users: User[];

  teamOne: string[] = ['', ''];
  teamTwo: string[] = ['', ''];

  errorMessage = '';

  @ViewChildren(PlayerSelectionFormFieldComponent) children!:
    QueryList<PlayerSelectionFormFieldComponent>;

  constructor(public userService: UserService,
              private router: Router,
              private gameService: GameService) { }

  ngOnInit() {
    this.users = this.userService.getAllPlayers();
    this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.userService.setGames(games);
    });
  }

  setCalculationError(message: string) {
    this.errorMessage = message;
  }

  calculate() {
    let valid = true;
    let count = 0;
    this.children.forEach((child) => {
      valid = child.playerControl.valid;
      if (!valid) {
        return;
      }
      if (count < 2) {
        this.teamOne[count] = child.name.toLowerCase();
      } else {
        this.teamTwo[count - 2] = child.name.toLowerCase();
      }
      count++;
    });

    this.router.navigate(['/predict-matchup/stats'],
    { queryParams: {
      teamOne: this.teamOne,
      teamTwo: this.teamTwo
     }});
  }
}
