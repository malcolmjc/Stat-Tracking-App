import { Component, OnInit } from '@angular/core';
import { FormControl, Validators  } from '@angular/forms';

import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  public userControl = new FormControl('', [
    Validators.minLength(4)
  ]);
  public usernames: string[] = [];
  public selectedUsername: string;

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  public ngOnInit() {
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
          this.usernames = users;
        });
    });
  }

  public selectUser(username: string) {
    this.selectedUsername = username;
  }

  private noUsersFound(search: string) {
    this.toastr.error(`Searched for "${search}"`, 'No users found!');
  }
}
