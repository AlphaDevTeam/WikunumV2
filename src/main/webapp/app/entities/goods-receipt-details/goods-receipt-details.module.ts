import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { GoodsReceiptDetailsComponent } from './goods-receipt-details.component';
import { GoodsReceiptDetailsDetailComponent } from './goods-receipt-details-detail.component';
import { GoodsReceiptDetailsUpdateComponent } from './goods-receipt-details-update.component';
import { GoodsReceiptDetailsDeleteDialogComponent } from './goods-receipt-details-delete-dialog.component';
import { goodsReceiptDetailsRoute } from './goods-receipt-details.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(goodsReceiptDetailsRoute)],
  declarations: [
    GoodsReceiptDetailsComponent,
    GoodsReceiptDetailsDetailComponent,
    GoodsReceiptDetailsUpdateComponent,
    GoodsReceiptDetailsDeleteDialogComponent
  ],
  entryComponents: [GoodsReceiptDetailsDeleteDialogComponent]
})
export class WikunumV2GoodsReceiptDetailsModule {}
