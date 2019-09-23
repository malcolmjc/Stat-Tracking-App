import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/auth/auth.service';
import { Notification } from '../../notifications/notification.model';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public username = '';
  public profileImagePath;
  public imageUploading = false;
  public notifications: Notification[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastr: ToastrService) { }

  public ngOnInit() {
    this.username = this.authService.getUserName();
    this.getProfileImage();
    this.userService.getNotificationsForUser(this.username)
      .subscribe((notifications: Notification[]) => {
        console.log(notifications);
        this.notifications = notifications;
      }, (error: HttpErrorResponse) => {
        this.toastr.error('Could not retrieve your notifications', 'Notification Retrieval Failure');
      });
  }

  public imageSelected(image: File) {
    this.imageUploading = true;
    this.userService.updateProfileImage(image, this.username).subscribe((result) => {
      this.toastr.success('Updated profile image!');
      this.getProfileImage();
    }, (error) => {
      this.toastr.error('Failed to update profile image');
    });
  }

  private getProfileImage() {
    this.userService.getProfileImageLink(this.username).subscribe((result: { path: string }) => {
      this.profileImagePath = result.path ? result.path : 'assets/question.png';
    });
    this.imageUploading = false;
  }
}
