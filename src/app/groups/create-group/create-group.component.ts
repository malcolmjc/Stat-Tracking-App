import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GroupService } from '../group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private groupCreatedListener: Subscription;

  constructor(private groupService: GroupService, private router: Router, private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.groupCreatedListener = this.groupService.getGroupCreatedListener().subscribe((response) => {
      if (!response) {
        this.toastr.error('', 'Unable to create group');
      }
      this.router.navigate(['/my-groups']);
    });
  }

  public ngOnDestroy(): void {
    this.groupCreatedListener.unsubscribe();
  }

  public onCreateGroup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.groupService.createGroup(form.value.groupName, form.value.password, form.value.slogan, form.value.description);
  }
}
