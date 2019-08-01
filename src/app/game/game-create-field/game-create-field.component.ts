import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatType } from '../stat-types-enum';

@Component({
  selector: 'app-game-create-field',
  templateUrl: './game-create-field.component.html',
  styleUrls: ['./game-create-field.component.css']
})
export class GameCreateFieldComponent {
  @Input() public statType: StatType;
  @Input() public statTitle = '';
  @Input() public statCount = 0;

  @Output() public statChanged = new EventEmitter<{
    statType: StatType,
    statCount: number
  }>();

  public onNegativeClicked() {
    if (this.statCount >= 1) {
      this.statCount--;
    }
    this.emitStats();
  }

  public onPositiveClicked() {
    this.statCount++;
    this.emitStats();
  }

  private emitStats() {
    this.statChanged.emit({
      statType: this.statType,
      statCount: this.statCount
    });
  }
}
