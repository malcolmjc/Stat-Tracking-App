import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-selection-form-field',
  template: 'MOCK player-selection-form-field'
})
export class MockPlayerSelectionFormFieldComponent {
  @Input() public playerNames: string[] = [];
}
