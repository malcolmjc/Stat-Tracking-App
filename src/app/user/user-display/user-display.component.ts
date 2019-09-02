import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {
  @Input() public username: string;
  @Input() public size: 'medium' | 'large' = 'medium';
  public profilePath: string;

  constructor(private userService: UserService) { }

  public ngOnInit() {
    if (this.username) {
      this.userService.getProfileImageLink(this.username).subscribe((result) => {
        this.profilePath = result.path;
      });
    }
  }
}
