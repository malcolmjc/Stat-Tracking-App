import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit, OnChanges {
  @Input() public username: string;
  @Input() public size: 'medium' | 'large' = 'medium';
  public profilePath: string;

  constructor(private userService: UserService) { }

  public ngOnInit() {
    if (this.username) {
      this.getProfilePath();
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.username && this.username) {
      this.getProfilePath();
    }
  }

  private getProfilePath() {
    this.userService.getProfileImageLink(this.username).subscribe((result) => {
      this.profilePath = result.path;
    });
  }
}
