import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild(NgForm) public form;
  public isLoading = false;

  private authStatusSubscription: Subscription;

  constructor(public authService: AuthService) {}

  public ngOnInit() {
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(
      (authStatus: boolean) => {
        this.isLoading = false;
      }
    );
  }

  public onSignup() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.form.value.email, this.form.value.password, this.form.value.username);
  }

  public ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}

