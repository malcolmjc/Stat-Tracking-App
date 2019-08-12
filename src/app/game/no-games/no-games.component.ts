import { Component, OnInit } from '@angular/core';

import { GroupService } from 'src/app/groups/group.service';

@Component({
  selector: 'app-no-games',
  templateUrl: './no-games.component.html',
  styleUrls: ['./no-games.component.css']
})
export class NoGamesComponent implements OnInit {
  public message = 'You have no games yet!';
  public inGroup = false;

  constructor(private groupService: GroupService) { }

  public ngOnInit(): void {
    if (this.groupService.getCurrentGroup()) {
      this.inGroup = true;
      this.message = 'Group has no games yet!';
    }
  }
}
