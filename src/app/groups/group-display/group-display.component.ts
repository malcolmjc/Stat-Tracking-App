import { Component, Input, OnInit } from '@angular/core';

import { Group } from '../group.model';

@Component({
  selector: 'app-group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.scss']
})
export class GroupDisplayComponent {
  @Input() public group: Group;
}
