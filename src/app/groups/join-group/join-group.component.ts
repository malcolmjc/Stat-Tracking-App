import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators  } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/auth/auth.service';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent implements OnInit {
  @ViewChild(NgForm) public form;
  public groupControl = new FormControl('', [
    Validators.minLength(4)
  ]);
  public groups: Group[] = [];
  public selectedGroup: Group = null;
  public isLoading = false;

  constructor(public groupService: GroupService,
              public authService: AuthService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) { }

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.groupService.getGroupById(params.id, ['name', 'members', 'slogan', 'description']).subscribe((group) => {
          this.selectedGroup = group;
          this.groupControl.setValue(group.name);
        });
      }
    });

    this.groupControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((search) => {
        if (this.groupControl.invalid) {
          return;
        } else if (this.groupControl.value === '') {
          return this.groups = [];
        }
        this.groupService.findGroups(search).pipe(
          map((response) => response.groups),
          map((groups) => {
            return groups.map((group) => {
              return {
                ...group,
                id: group._id
              };
            });
          })
        ).subscribe((groups: Group[]) => {
          if (!groups || groups.length === 0) {
            this.toastr.error(`Searched for "${search}"`, 'No groups found!');
          }
          this.groups = groups;
        });
    });
  }

  public onJoin() {
    if (this.form.invalid) {
      return;
    }
    const groupName = this.selectedGroup.name;
    this.isLoading = true;
    this.groupService.joinGroup(this.form.value.password, false, this.selectedGroup.id).pipe(
      catchError((err) => {
        if (err.status === 409) {
          this.toastr.error(`You've already joined this group`, 'Already Joined');
        } else if (err.status === 401) {
          this.toastr.error(`Not the right password for ${groupName}`, 'Incorrect Password');
        }
        return of(false);
      })
    ).subscribe((response) => {
        if (response) {
          this.selectedGroup.members.push(this.authService.getUserName());
          this.toastr.success(`Joined group ${groupName}`, 'Joined!');
        }
        this.isLoading = false;
      });
  }

  public selectGroup(group: Group) {
    this.selectedGroup = group;
    this.groupControl.setValue(group.name);
    this.router.navigate([], {
      queryParams: {
        id: group.id
      },
      queryParamsHandling: 'merge',
    });
  }
}
