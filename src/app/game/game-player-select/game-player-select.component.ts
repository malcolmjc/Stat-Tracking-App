import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GameService } from '../game.service';
import { PlayerSelectionFormFieldComponent } from 'src/app/user/player-selection-form-field/player-selection-form-field.component';
import { UserService } from 'src/app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game-player-select',
  templateUrl: './game-player-select.component.html',
  styleUrls: ['./game-player-select.component.css']
})
export class GamePlayerSelectComponent implements OnInit {
  @ViewChildren(PlayerSelectionFormFieldComponent) public playerSelectionFormFields!:
    QueryList<PlayerSelectionFormFieldComponent>;
  public playerNames: string[] = [];
  public numberOfPlayers = 4;
  public possiblePlayerNumbers = [1, 2, 3, 4];

  constructor(private router: Router,
              public userService: UserService,
              public gameService: GameService,
              private toastr: ToastrService) { }

  public ngOnInit() {
    this.userService.getUsers().subscribe((usernames) => {
      console.log(usernames);
      this.playerNames = usernames;
    }, (error: HttpErrorResponse) => {
      if (error.status === 500) {
        this.toastr.error('Something went wrong', 'Error retrieving users');
      } else if (error.status === 401) {
        this.toastr.error('You are not a member of this group', 'Unauthorized!');
      }
    });
  }

  public onCancelClicked() {
    this.router.navigate(['']);
  }

  public onDoneClicked(event: any) {
    event.preventDefault();

    const usernames: string[] = [];
    for (const playerSelectionFormField of this.playerSelectionFormFields.toArray()) {
      if (!playerSelectionFormField.playerControl.valid) {
        this.toastr.error('One or more missing usernames!', 'Username Missing');
        return;
      } else if (usernames.includes(playerSelectionFormField.selectedUsername)) {
        this.toastr.error('One or more duplicate usernames!', 'Duplicate Username');
        return;
      }
      usernames.push(playerSelectionFormField.selectedUsername);
    }

    this.router.navigate(['create'], { queryParams: { player: usernames } });
  }
}
