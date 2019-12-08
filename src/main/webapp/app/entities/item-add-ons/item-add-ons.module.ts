import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { ItemAddOnsComponent } from './item-add-ons.component';
import { ItemAddOnsDetailComponent } from './item-add-ons-detail.component';
import { ItemAddOnsUpdateComponent } from './item-add-ons-update.component';
import { ItemAddOnsDeleteDialogComponent } from './item-add-ons-delete-dialog.component';
import { itemAddOnsRoute } from './item-add-ons.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(itemAddOnsRoute)],
  declarations: [ItemAddOnsComponent, ItemAddOnsDetailComponent, ItemAddOnsUpdateComponent, ItemAddOnsDeleteDialogComponent],
  entryComponents: [ItemAddOnsDeleteDialogComponent]
})
export class WikunumV2ItemAddOnsModule {}
