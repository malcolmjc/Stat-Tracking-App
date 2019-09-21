import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GroupService } from '../group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, OnDestroy {
  @ViewChild(NgForm) public form;
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

  public onCreateGroup() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.groupService.createGroup(this.form.value.groupName, this.form.value.password,
                                  this.form.value.slogan, this.form.value.description);
  }
}
