import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public username = '';

  constructor(private authService: AuthService, private userService: UserService) { }

  public ngOnInit() {
    this.username = this.authService.getUserName();
  }

  public imageSelected(image: File) {
    console.log('image selected');
    this.userService.updateProfileImage(image, this.username).subscribe((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }
}
