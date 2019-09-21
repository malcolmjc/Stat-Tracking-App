import { Component, Input } from '@angular/core';

import { User } from '../user.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})

export class UserStatsComponent {
  @Input() public users: User[] = [];
  public displayedColumns: string[] = [
    'win', 'loss', 'point', 'catch', 'drop', 'fifa', 'sinker'
  ];
}
