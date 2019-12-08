import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { StorageBinComponent } from './storage-bin.component';
import { StorageBinDetailComponent } from './storage-bin-detail.component';
import { StorageBinUpdateComponent } from './storage-bin-update.component';
import { StorageBinDeleteDialogComponent } from './storage-bin-delete-dialog.component';
import { storageBinRoute } from './storage-bin.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(storageBinRoute)],
  declarations: [StorageBinComponent, StorageBinDetailComponent, StorageBinUpdateComponent, StorageBinDeleteDialogComponent],
  entryComponents: [StorageBinDeleteDialogComponent]
})
export class WikunumV2StorageBinModule {}
