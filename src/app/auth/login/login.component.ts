import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
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

  public onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  public ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
