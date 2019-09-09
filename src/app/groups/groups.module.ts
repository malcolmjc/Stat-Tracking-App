import { NgModule } from '@angular/core';

import { AddMemberModule } from './add-member/add-member.module';
import { CreateGroupModule } from './create-group/create-group.module';
import { GroupHomepageModule } from './group-homepage/group-homepage.module';
import { GroupListModule } from './group-list/group-list.module';
import { GroupModule } from './group/group.module';
import { JoinGroupModule } from './join-group/join-group.module';

@NgModule({
  exports: [
    CreateGroupModule,
    GroupModule,
    GroupHomepageModule,
    GroupListModule,
    JoinGroupModule,
    AddMemberModule
  ]
})
export class GroupsModule { }
