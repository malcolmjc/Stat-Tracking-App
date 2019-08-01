import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/auth/auth.service';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public groups: Group[] = [];

  private groupListener: Subscription;

  constructor(
     private groupService: GroupService,
     private toastr: ToastrService,
     private router: Router,
     private authService: AuthService) { }

  public ngOnInit() {
    this.isLoading = true;
    this.groupListener = this.groupService.getGroupUpdateListener().subscribe((groups: Group[]) => {
      this.groups = groups;
      this.isLoading = false;
    });
    this.groupService.getGroups();
  }

  public ngOnDestroy() {
    this.groupListener.unsubscribe();
  }

  public onGroupClicked(groupId: string) {
    this.router.navigate(['group'], { queryParams: { id: groupId } });
  }

  public onGroupSelected(group: Group) {
    this.authService.setCurrentGroup(group.id);
    this.toastr.success(group.name, 'Set as current group!');
  }
}
