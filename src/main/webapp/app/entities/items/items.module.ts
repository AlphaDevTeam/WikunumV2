import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { ItemsComponent } from './items.component';
import { ItemsDetailComponent } from './items-detail.component';
import { ItemsUpdateComponent } from './items-update.component';
import { ItemsDeleteDialogComponent } from './items-delete-dialog.component';
import { itemsRoute } from './items.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(itemsRoute)],
  declarations: [ItemsComponent, ItemsDetailComponent, ItemsUpdateComponent, ItemsDeleteDialogComponent],
  entryComponents: [ItemsDeleteDialogComponent]
})
export class WikunumV2ItemsModule {}
