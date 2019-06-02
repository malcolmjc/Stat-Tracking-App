import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { PlayerSelectionFormFieldComponent } from 'src/app/user/player-selection-form-field/player-selection-form-field.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-player-select',
  templateUrl: './game-player-select.component.html',
  styleUrls: ['./game-player-select.component.css']
})
export class GamePlayerSelectComponent implements OnInit {
  @ViewChildren(PlayerSelectionFormFieldComponent) children!:
    QueryList<PlayerSelectionFormFieldComponent>;

  private playerNames: string[];
  constructor(private router: Router, public userService: UserService
    , public gameService: GameService) { }

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
    let names: string[] = [];
    this.children.forEach((child) => {
      valid = child.playerControl.valid;
      names.push(child.name);
    });
    if (valid) {
      this.router.navigate(['create'], { queryParams: { player: names } });
    }
  }
}
