import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupService } from '../group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  constructor(private groupService: GroupService, private router: Router) {}

  public onCreateGroup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.groupService.createGroup(form.value.groupName, form.value.password, form.value.slogan, form.value.description);
    this.router.navigate(['/my-groups']);
  }
}
