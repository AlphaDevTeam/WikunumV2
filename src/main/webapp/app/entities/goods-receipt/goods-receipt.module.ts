import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { GoodsReceiptComponent } from './goods-receipt.component';
import { GoodsReceiptDetailComponent } from './goods-receipt-detail.component';
import { GoodsReceiptUpdateComponent } from './goods-receipt-update.component';
import { GoodsReceiptDeleteDialogComponent } from './goods-receipt-delete-dialog.component';
import { goodsReceiptRoute } from './goods-receipt.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(goodsReceiptRoute)],
  declarations: [GoodsReceiptComponent, GoodsReceiptDetailComponent, GoodsReceiptUpdateComponent, GoodsReceiptDeleteDialogComponent],
  entryComponents: [GoodsReceiptDeleteDialogComponent]
})
export class WikunumV2GoodsReceiptModule {}