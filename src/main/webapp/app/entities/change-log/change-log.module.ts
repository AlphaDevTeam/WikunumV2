import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { ChangeLogComponent } from './change-log.component';
import { ChangeLogDetailComponent } from './change-log-detail.component';
import { ChangeLogUpdateComponent } from './change-log-update.component';
import { ChangeLogDeleteDialogComponent } from './change-log-delete-dialog.component';
import { changeLogRoute } from './change-log.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(changeLogRoute)],
  declarations: [ChangeLogComponent, ChangeLogDetailComponent, ChangeLogUpdateComponent, ChangeLogDeleteDialogComponent],
  entryComponents: [ChangeLogDeleteDialogComponent]
})
export class WikunumV2ChangeLogModule {}