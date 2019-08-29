import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public ngOnInit() {
    // TODO - query param for username and get user details from api
  }

  public imageSelected(image: File) {
    console.log(image);
  }
}
