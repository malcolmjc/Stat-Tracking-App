import { Component, Input } from '@angular/core';

import { Group } from '../group.model';

@Component({
  selector: 'app-group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.css']
})
export class GroupDisplayComponent {
  @Input() group: Group;
}
