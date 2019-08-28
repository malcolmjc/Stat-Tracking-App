import { Component, Input } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user-charts',
  template: 'MOCK user-charts'
})
export class MockUserChartsComponent {
  @Input() public users: User[];
}
