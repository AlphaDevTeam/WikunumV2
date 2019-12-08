import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { PurchaseAccountComponent } from './purchase-account.component';
import { PurchaseAccountDetailComponent } from './purchase-account-detail.component';
import { PurchaseAccountUpdateComponent } from './purchase-account-update.component';
import { PurchaseAccountDeleteDialogComponent } from './purchase-account-delete-dialog.component';
import { purchaseAccountRoute } from './purchase-account.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(purchaseAccountRoute)],
  declarations: [
    PurchaseAccountComponent,
    PurchaseAccountDetailComponent,
    PurchaseAccountUpdateComponent,
    PurchaseAccountDeleteDialogComponent
  ],
  entryComponents: [PurchaseAccountDeleteDialogComponent]
})
export class WikunumV2PurchaseAccountModule {}
