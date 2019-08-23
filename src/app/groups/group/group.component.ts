import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/auth/auth.service';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public group: Group;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private toastr: ToastrService) { }

  public ngOnInit() {
    this.route.queryParams.subscribe((params: { id: string}) => {
      if (!params.id) {
        this.router.navigate(['/my-groups']);
      } else {
        this.groupService.getGroupById(params.id).subscribe((group) => {
          if (!group) {
            this.toastr.error('', 'Could not find specified group');
            this.router.navigate(['/my-groups']);
          }
          this.group = group;
        });
      }
    });
  }

  public addMemberClicked() {
    // TODO
  }

  public viewLeaderboardClicked(id: string) {
    this.groupService.setCurrentGroup(id);
    this.router.navigate(['/leaderboard']);
  }

  public viewAllGamesClicked(id: string) {
    this.groupService.setCurrentGroup(id);
    this.router.navigate(['']);
  }

  public addNewGameClicked(id: string) {
    this.groupService.setCurrentGroup(id);
    this.router.navigate(['/select-players']);
  }
}
