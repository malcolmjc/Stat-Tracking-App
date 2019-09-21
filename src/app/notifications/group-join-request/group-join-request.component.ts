import { Component, Input, EventEmitter, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from 'src/app/auth/auth.service';
import { GroupService } from 'src/app/groups/group.service';
import { Notification } from '../notification.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-group-join-request',
  templateUrl: './group-join-request.component.html',
  styleUrls: ['./group-join-request.component.scss']
})
export class GroupJoinRequestComponent {
  @Input() public notification: Notification;
  @Output() public wasDeleted = new EventEmitter<string>(); // notification id

  constructor(private authService: AuthService,
              private userService: UserService,
              private groupService: GroupService,
              private toastr: ToastrService) { }

  public acceptClicked() {
    this.groupService.joinGroup(this.notification.details.encryptedPassword, true,
       this.notification.details.groupId).subscribe((response) => {
        this.toastr.success(`Joined group ${this.notification.details.groupName}`, 'Joined!');
        this.userService.deleteNotification(this.notification.id, this.authService.getUserId())
          .subscribe(() => {
            this.wasDeleted.emit(this.notification.id);
          });
       }, (error: HttpErrorResponse) => {
         if (error.status === 409) {
           this.toastr.error(`You've already joined group ${this.notification.details.groupName}`, 'Already Joined!');
         } else {
           this.toastr.error(`Unable to join group ${this.notification.details.groupName}`, 'Failure!');
         }
       });
  }

  public declineClicked() {
    this.userService.deleteNotification(this.notification.id, this.authService.getUserId())
      .subscribe(() => {
        this.wasDeleted.emit(this.notification.id);
      }, (error: HttpErrorResponse) => {
        this.toastr.error('Try again later', 'Unable to decline!');
      });
  }
}
