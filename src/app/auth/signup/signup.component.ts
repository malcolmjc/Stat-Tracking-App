import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
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

  public onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.username);
  }

  public ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}

