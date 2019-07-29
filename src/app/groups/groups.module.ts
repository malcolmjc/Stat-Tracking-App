import { NgModule } from '@angular/core';

import { CreateGroupModule } from './create-group/create-group.module';
import { GroupModule } from './group/group.module';
import { GroupHomepageModule } from './group-homepage/group-homepage.module';
import { GroupListModule } from './group-list/group-list.module';
import { JoinGroupModule } from './join-group/join-group.module';

@NgModule({
  exports: [
    CreateGroupModule,
    GroupModule,
    GroupHomepageModule,
    GroupListModule,
    JoinGroupModule
  ]
})
export class GroupsModule { }
