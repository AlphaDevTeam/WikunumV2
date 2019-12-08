import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WikunumV2SharedModule } from 'app/shared/shared.module';
import { CashPaymentVoucherExpenseComponent } from './cash-payment-voucher-expense.component';
import { CashPaymentVoucherExpenseDetailComponent } from './cash-payment-voucher-expense-detail.component';
import { CashPaymentVoucherExpenseUpdateComponent } from './cash-payment-voucher-expense-update.component';
import { CashPaymentVoucherExpenseDeleteDialogComponent } from './cash-payment-voucher-expense-delete-dialog.component';
import { cashPaymentVoucherExpenseRoute } from './cash-payment-voucher-expense.route';

@NgModule({
  imports: [WikunumV2SharedModule, RouterModule.forChild(cashPaymentVoucherExpenseRoute)],
  declarations: [
    CashPaymentVoucherExpenseComponent,
    CashPaymentVoucherExpenseDetailComponent,
    CashPaymentVoucherExpenseUpdateComponent,
    CashPaymentVoucherExpenseDeleteDialogComponent
  ],
  entryComponents: [CashPaymentVoucherExpenseDeleteDialogComponent]
})
export class WikunumV2CashPaymentVoucherExpenseModule {}
