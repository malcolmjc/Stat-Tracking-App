import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public username = '';

  constructor(private authService: AuthService) { }

  public ngOnInit() {
    this.username = this.authService.getUserName();
  }

  public imageSelected(image: File) {
    console.log(image);
  }
}
