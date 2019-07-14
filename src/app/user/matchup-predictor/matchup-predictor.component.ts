import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from 'src/app/game/game.model';
import { GameService } from 'src/app/game/game.service';
import { PlayerSelectionFormFieldComponent } from '../player-selection-form-field/player-selection-form-field.component';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-matchup-predictor',
  templateUrl: './matchup-predictor.component.html',
  styleUrls: ['./matchup-predictor.component.css']
})
export class MatchupPredictorComponent implements OnInit {
  users: User[];
  teamOne: string[] = ['', ''];
  teamTwo: string[] = ['', ''];

  @ViewChildren(PlayerSelectionFormFieldComponent) playerSelectionFormFields!:
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

  calculate() {
    let playerCount = 0;
    this.playerSelectionFormFields.forEach((playerSelectionFormField) => {
      if (!playerSelectionFormField.playerControl.valid) {
        return;
      }
      if (playerCount < 2) {
        this.teamOne[playerCount] = playerSelectionFormField.name.toLowerCase();
      } else {
        this.teamTwo[playerCount - 2] = playerSelectionFormField.name.toLowerCase();
      }
      playerCount++;
    });

    this.router.navigate(['/predict-matchup/stats'],
      {
        queryParams: {
          teamOne: this.teamOne,
          teamTwo: this.teamTwo
        }
      });
  }
}
