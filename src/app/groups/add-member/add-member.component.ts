import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/auth/auth.service';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  @Input() public group: Group;
  public userControl = new FormControl('', [
    Validators.minLength(4),
    this.emailValidator()
  ]);
  public usernames: string[] = [];
  public selectedUsername: string;
  public sendingNotification = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private groupService: GroupService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.groupId) {
        this.groupService.getGroupById(params.groupId, ['name', 'password', 'members']).subscribe((group) => {
          this.group = group;
        });
      }
    });

    this.userControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((search) => {
        if (this.userControl.invalid) {
          return;
        } else if (this.userControl.value === '') {
          return this.usernames = [];
        }
        this.userService.findUsers(search).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 500) {
              this.toastr.error(`Something went wrong while searching`, 'Search Error');
            }
            return of([]);
          })
        ).subscribe((users: string[]) => {
          if (!users || users.length === 0) {
            this.noUsersFound(search);
          }
          this.usernames = users.filter((user) => !this.group.members.includes(user));
        });
    });
  }

  public selectUser(username: string) {
    this.selectedUsername = username;
  }

  public addMemberClicked() {
    this.sendingNotification = true;
    this.userService.addNotificationToUser(this.selectedUsername, {
      type: 'group-join-request',
      recipient: this.selectedUsername,
      sender: this.authService.getUserName(),
      details: {
        groupName: this.group.name,
        groupId: this.group.id,
        encryptedPassword: this.group.password
      },
      id: null
    }).subscribe((response) => {
      this.sendingNotification = false;
      this.toastr.success('Sent notification to ' + this.selectedUsername, 'Request Sent!');
    }, (error: HttpErrorResponse) => {
      this.sendingNotification = false;
      this.toastr.error('Could not send notification to ' + this.selectedUsername, 'Request Failed!');
    });
  }

  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let valid = true;
      if (control.value.includes('@')) {
        // Simplified RFC 2822
        valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          .test(control.value);
      }
      return valid ? null : { email: { value: control.value } };
    };
  }

  private noUsersFound(search: string) {
    this.toastr.error(`Searched for "${search}"`, 'No users found!');
  }
}
