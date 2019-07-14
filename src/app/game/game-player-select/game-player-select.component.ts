import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game.service';
import { PlayerSelectionFormFieldComponent } from 'src/app/user/player-selection-form-field/player-selection-form-field.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-game-player-select',
  templateUrl: './game-player-select.component.html',
  styleUrls: ['./game-player-select.component.css']
})
export class GamePlayerSelectComponent implements OnInit {
  @ViewChildren(PlayerSelectionFormFieldComponent) playerSelectionFormFields!:
    QueryList<PlayerSelectionFormFieldComponent>;

  private playerNames: string[];
  constructor(private router: Router, public userService: UserService,
              public gameService: GameService) { }

  ngOnInit() {
    this.playerNames = this.userService.getAllPlayers().map((val) => {
      return val.name;
    });
  }

  onCancelClicked() {
    this.router.navigate(['']);
  }

  onDoneClicked() {
    let valid = true;
    const names: string[] = [];
    this.playerSelectionFormFields.forEach((playerSelectionFormField) => {
      valid = playerSelectionFormField.playerControl.valid;
      names.push(playerSelectionFormField.name);
    });
    if (valid) {
      this.router.navigate(['create'], { queryParams: { player: names } });
    }
  }
}
