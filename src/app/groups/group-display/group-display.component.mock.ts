import { Component, Input } from '@angular/core';

import { Group } from '../group.model';

@Component({
  selector: 'app-group-display',
  template: 'MOCK group display'
})
export class MockGroupDisplayComponent {
  @Input() public group: Group;
}
