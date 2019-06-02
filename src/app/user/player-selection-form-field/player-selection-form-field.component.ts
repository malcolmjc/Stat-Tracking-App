import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-player-selection-form-field',
  templateUrl: './player-selection-form-field.component.html',
  styleUrls: ['./player-selection-form-field.component.css']
})
export class PlayerSelectionFormFieldComponent implements OnInit {
  playerControl = new FormControl('', [
    Validators.required,
    this.forbiddenNameValidator()
  ]);
  players: string[] = [];
  name = '';
  filteredPlayers: string[];

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valid = true;
      if (control.value !== undefined && this.players !== undefined) {
        valid = this.players.includes(control.value);
      }
      return valid ? null : {'forbiddenName': {value: control.value}};
    };
  }
  constructor(public userService: UserService) { }

  ngOnInit() {
    const players = this.userService.getAllPlayers();
    for (const player of players) {
      this.players.push(player.name);
    }
    this.filteredPlayers = this.players;
    this.playerControl.valueChanges.subscribe((value) => {
      this.filteredPlayers = this.players.filter((str) => {
        return str.toLowerCase().includes(value.toLowerCase());
      });
    });
  }

  selectPlayer(name: string) {
    this.name = name;
  }
}
