import { AbstractControl, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-player-selection-form-field',
  templateUrl: './player-selection-form-field.component.html',
  styleUrls: ['./player-selection-form-field.component.scss']
})
export class PlayerSelectionFormFieldComponent implements OnInit, OnChanges {
  @Input() public playerNames: string[] = [];
  public playerControl = new FormControl('', [
    Validators.required,
    this.forbiddenNameValidator()
  ]);
  public selectedUsername = '';
  public filteredPlayers: string[];

  public ngOnInit() {
    this.filteredPlayers = this.playerNames;
    this.playerControl.valueChanges.subscribe((value) => {
      if (this.playerNames) {
        this.filteredPlayers = this.playerNames.filter((name) => {
          return name.toLowerCase().includes(value.toLowerCase());
        });
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    // when playerNames are updated by parent, update auto complete
    if (changes.playerNames) {
      this.filteredPlayers = this.playerNames;
    }
  }

  public selectPlayer(name: string) {
    this.selectedUsername = name;
  }

  private forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valid = true;
      if (control.value && this.playerNames) {
        valid = this.playerNames.includes(control.value);
      }
      return valid ? null : { forbiddenName: { value: control.value } };
    };
  }
}
