import { Component, OnDestroy, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

import { MatRadioButton } from '@angular/material';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  @ViewChildren('radioBtn') public radioButtons: QueryList<MatRadioButton>;
  public isLoading = false;
  public groups: Group[] = [];
  public selectedGroupId: string;

  private groupListener: Subscription;

  constructor(private groupService: GroupService,
              private toastr: ToastrService,
              private router: Router) { }

  public ngOnInit() {
    this.isLoading = true;
    this.groupListener = this.groupService.getGroupUpdateListener().subscribe((groups: Group[]) => {
      this.groups = groups;
      this.isLoading = false;
    });
    this.selectedGroupId = this.groupService.getCurrentGroup();
    this.groupService.getGroups();
  }

  public ngOnDestroy() {
    this.groupListener.unsubscribe();
  }

  public onGroupClicked(groupId: string) {
    this.router.navigate(['group'], { queryParams: { id: groupId } });
  }

  public onGroupSelected(group: Group, event: MouseEvent) {
    if (group.id !== this.selectedGroupId) {
      this.selectedGroupId = group.id;
      this.groupService.setCurrentGroup(group.id);
      this.toastr.success(group.name, 'Set as current group!');
    } else {
      this.groupService.unselectGroup();
      event.preventDefault();
      this.radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
      this.toastr.success(group.name, 'Unset as current group!');
    }
  }
}
