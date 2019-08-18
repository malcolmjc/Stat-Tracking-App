import { Component, EventEmitter, Input, Output } from '@angular/core';

import { StatType } from '../stat-types-enum';

@Component({
  selector: 'app-game-create-field',
  template: 'MOCK game-create-field',
})
export class MockGameCreateFieldComponent {
  @Input() public statType: StatType;
  @Input() public statTitle = '';
  @Input() public statCount = 0;

  @Output() public statChanged = new EventEmitter<{
    statType: StatType,
    statCount: number
  }>();
}
