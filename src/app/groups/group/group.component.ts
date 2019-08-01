import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

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
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
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
        this.groupService.getGroupById(params.id);
      }
    });
  }

  addMemberClicked() {
    // TODO
  }

  viewLeaderboardClicked(id: string) {
    this.authService.setCurrentGroup(id);
    this.router.navigate(['/leaderboard']);
  }

  viewAllGamesClicked(id: string) {
    this.authService.setCurrentGroup(id);
    this.router.navigate(['']);
  }

  addNewGameClicked(id: string) {
    this.authService.setCurrentGroup(id);
    this.router.navigate(['/select-players']);
  }
}
