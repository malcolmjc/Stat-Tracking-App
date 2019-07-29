import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
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
  public playerNames: string[] = [];

  constructor(private router: Router,
              public userService: UserService,
              public gameService: GameService) { }

  public ngOnInit() {
    this.userService.getUsers().subscribe((usernames) => {
      console.log(usernames);
      this.playerNames = usernames;
    });
  }

  onCancelClicked() {
    this.router.navigate(['']);
  }

  onDoneClicked() {
    let valid = true;
    const usernames: string[] = [];
    this.playerSelectionFormFields.forEach((playerSelectionFormField) => {
      valid = playerSelectionFormField.playerControl.valid;
      usernames.push(playerSelectionFormField.selectedUsername);
    });
    if (valid) {
      this.router.navigate(['create'], { queryParams: { player: usernames } });
    }
  }
}
