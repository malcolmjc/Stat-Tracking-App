import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { UserService } from '../user.service';

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
  playerNames: string[] = [];
  name = '';
  filteredPlayers: string[];

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.playerNames = this.userService.getAllPlayers().map((player) => {
      return player.name;
    });

    this.filteredPlayers = this.playerNames;
    this.playerControl.valueChanges.subscribe((value) => {
      this.filteredPlayers = this.playerNames.filter((name) => {
        return name.toLowerCase().includes(value.toLowerCase());
      });
    });
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valid = true;
      if (control.value && this.playerNames) {
        valid = this.playerNames.includes(control.value);
      }
      return valid ? null : { forbiddenName: { value: control.value } };
    };
  }

  selectPlayer(name: string) {
    this.name = name;
  }
}
