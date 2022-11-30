import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { UserGroupComponent } from './user-group.component';
import { UserGroupDetailComponent } from './user-group-detail.component';
import { UserGroupUpdateComponent } from './user-group-update.component';
import { UserGroupDeleteDialogComponent } from './user-group-delete-dialog.component';
import { userGroupRoute } from './user-group.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(userGroupRoute)],
  declarations: [UserGroupComponent, UserGroupDetailComponent, UserGroupUpdateComponent, UserGroupDeleteDialogComponent],
  entryComponents: [UserGroupDeleteDialogComponent]
})
export class WikunumV2UserGroupModule {}
