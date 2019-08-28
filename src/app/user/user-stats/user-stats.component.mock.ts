import { Component, Input } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user-stats',
  template: 'MOCK user-stats'
})

export class MockUserStatsComponent {
  @Input() public users: User[] = [];
}
