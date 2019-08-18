import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-create',
  template: 'MOCK game-create',
})
export class MockGameCreateComponent {
  @Input() public index = 0;
  @Input() public playerName = '';
  @Input() public singlePlayer = false;
  @Output() public statsChanged = new EventEmitter<string>();
}
