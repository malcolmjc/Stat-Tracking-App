import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
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

  public onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.form.value.email, this.form.value.password);
  }

  public ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
